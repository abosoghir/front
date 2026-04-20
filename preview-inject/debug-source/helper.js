import React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import * as jsxDevRuntime from "react/jsx-dev-runtime";
import FiberDebugger from "./fibber-debugger";
export const DEBUG_ERROR_KEY = "debugerror";const fiberDebugMap = new WeakMap<FiberNode, () => Error>();const nativeElementDebugMap = new WeakMap<HTMLElement, () => Error>();const wrappedRefCache = new WeakMap();
const pendingDebugErrors = new WeakMap<RefCallback, Array<() => Error>>();const refObjectCache = new WeakMap();
const refObjectDebugMap = new WeakMap<RefObject, () => Error>();const storeDebugInfo = (element, debugErrorFn) => {
  try {
    nativeElementDebugMap.set(element, debugErrorFn);
    const fiber = FiberDebugger.getFiberFromDOMNode(element);
    if (fiber) {
      fiberDebugMap.set(fiber, debugErrorFn);
    }
  } catch (e) {    if (process.env.NODE_ENV === "development") {
      console.warn("[Debug Source] Failed to store debug info:", e);
    }
  }
};const getOrCreateWrappedRef = (
  originalRef: Ref,
  debugErrorFn,
): RefCallback | undefined => {  if (!originalRef) {
    return (element) => {
      if (element instanceof HTMLElement) {
        storeDebugInfo(element, debugErrorFn);
      }
    };
  }  if (typeof originalRef === "function") {    let pending = pendingDebugErrors.get(originalRef);
    if (!pending) {
      pending = [];
      pendingDebugErrors.set(originalRef, pending);
    }
    pending.push(debugErrorFn);    let wrapped = wrappedRefCache.get(originalRef);
    if (!wrapped) {
      wrapped = (element) => {        if (element instanceof HTMLElement) {
          const queue = pendingDebugErrors.get(originalRef);
          if (queue && queue.length > 0) {
            const fn = queue.shift()!; // FIFO: first in, first out
            storeDebugInfo(element, fn);
          }
        }
        originalRef(element);
      };
      wrappedRefCache.set(originalRef, wrapped);
    }
    return wrapped;
  }  if (
    originalRef &&
    typeof originalRef === "object" &&
    "current" in originalRef
  ) {    refObjectDebugMap.set(originalRef, debugErrorFn);    let wrapped = refObjectCache.get(originalRef);
    if (!wrapped) {
      wrapped = (element) => {
        if (element instanceof HTMLElement) {
          const fn = refObjectDebugMap.get(originalRef);
          if (fn) {
            storeDebugInfo(element, fn);
          }
        }
        (originalRef).current = element;
      };
      refObjectCache.set(originalRef, wrapped);
    }
    return wrapped;
  }
  return undefined;
};
export function interceptReactJSX() {  const originalCreateElement = React.createElement;
  const originalJsx = (jsxRuntime).jsx;
  const originalJsxs = (jsxRuntime).jsxs;
  const originalJsxDEV = (jsxDevRuntime).jsxDEV;
  const setKeys = new Map()
  const overrideRuntimeMethod = <T extends object>(
    runtime: T,
    key: keyof T,
    value: T[keyof T],
  ) => {
    if (!runtime) return;
    const setObj = (runtime as { default: T }).default;
    try {
      Object.defineProperty(setObj, key, {
        configurable: true,
        writable: true,
        value,
      });
    } catch (e) {
      console.warn(`[Debug Source] Failed to override ${String(key)}:`, e);
    }
  };
  const createElementDebugError = () => {
    const error = new Error();
    return () => error;
  };  const isNativeDOMElement = (type) => {
    return typeof type === "string";
  };
  // Intercept React.createElement  (React as { createElement }).createElement = function (
    type: ElementType,
    props,
    ...children: React.ReactNode[]
  ) {    if (!isNativeDOMElement(type) && typeof type !== "function") {
      return originalCreateElement(
        type,
        props.Attributes,
        ...children,
      );
    }
    const debugErrorFn = createElementDebugError();    const mutableProps: JsxProps = props ? { ...props } : {};
    const wrappedRef = getOrCreateWrappedRef(mutableProps.ref, debugErrorFn);
    if (wrappedRef) {
      mutableProps.ref = wrappedRef;
    }
    return originalCreateElement(
      type,
      mutableProps.Attributes,
      ...children,
    );
  };  overrideRuntimeMethod(
    jsxRuntime,
    "jsx",
    function (type, props, key) {      if (!isNativeDOMElement(type) && typeof type !== "function") {
        return originalJsx(type, props, key);
      }
      const debugErrorFn = createElementDebugError();      const mutableProps: JsxProps = props ? { ...props } : {};
      const wrappedRef = getOrCreateWrappedRef(mutableProps.ref, debugErrorFn);
      if (wrappedRef) {
        mutableProps.ref = wrappedRef;
      }
      return originalJsx(type, mutableProps, key);
    },
  );  overrideRuntimeMethod(
    jsxRuntime,
    "jsxs",
    function (type, props, key) {      if (!isNativeDOMElement(type) && typeof type !== "function") {
        return originalJsxs(type, props, key);
      }
      const debugErrorFn = createElementDebugError();      const mutableProps: JsxProps = props ? { ...props } : {};
      const wrappedRef = getOrCreateWrappedRef(mutableProps.ref, debugErrorFn);
      if (wrappedRef) {
        mutableProps.ref = wrappedRef;
      }
      return originalJsxs(type, mutableProps, key);
    },
  );  if (originalJsxDEV) {
    overrideRuntimeMethod(
      jsxDevRuntime,
      "jsxDEV",
      function (
        type: ElementType,
        props,
        key,
        isStaticChildren,
        source,
        self,
      ) {        if (!isNativeDOMElement(type) && typeof type !== "function") {
          return originalJsxDEV(
            type,
            props,
            key,
            isStaticChildren,
            source,
            self,
          );
        }
        const debugErrorFn = createElementDebugError();        const mutableProps: JsxProps = props ? { ...props } : {};
        const wrappedRef = getOrCreateWrappedRef(
          mutableProps.ref,
          debugErrorFn,
        );
        if (wrappedRef) {
          mutableProps.ref = wrappedRef;
        }
        return originalJsxDEV(
          type,
          mutableProps,
          key,
          isStaticChildren,
          source,
          self,
        );
      },
    );
  }
}
export function getDebugErrorFromSelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    return null;
  }
  const tagName = element.tagName.toLowerCase();  const nativeDebugErrorFn = nativeElementDebugMap.get(element);
  if (nativeDebugErrorFn) {
    return {
      element,
      tagName,
      debugError: nativeDebugErrorFn(),
    };
  }  const fiber = FiberDebugger.getFiberFromDOMNode(element);
  if (fiber) {
    const fiberDebugErrorFn = fiberDebugMap.get(fiber);
    if (fiberDebugErrorFn) {
      return {
        element,
        tagName,
        debugError: fiberDebugErrorFn(),
      };
    }
  }
  return null;
}