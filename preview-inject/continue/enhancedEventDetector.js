
class EventListenerRegistry {  #listeners> =
    new WeakMap();
  #originalAddEventListener;
  #originalRemoveEventListener;
  #patched = false;
  constructor() {
    this.#originalAddEventListener = HTMLElement.prototype.addEventListener;
    this.#originalRemoveEventListener =
      HTMLElement.prototype.removeEventListener;
  }
  patch() {
    if (this.#patched) return;    const self = this;    HTMLElement.prototype.addEventListener = function (
      type,
      listener,
      options | AddEventListenerOptions,
    ) {      self.#recordListener(
        this,
        type,
        listener,
      );      return self.#originalAddEventListener.call(this, type, listener, options);
    };    HTMLElement.prototype.removeEventListener = function (
      type,
      listener,
      options | EventListenerOptions,
    ) {      self.#removeListener(
        this,
        type,
        listener,
      );      return self.#originalRemoveEventListener.call(
        this,
        type,
        listener,
        options,
      );
    };
    this.#patched = true;
    console.log("[EventListenerRegistry] ✅ addEventListener patched");
  }
  unpatch() {
    if (!this.#patched) return;
    HTMLElement.prototype.addEventListener = this.#originalAddEventListener;
    HTMLElement.prototype.removeEventListener =
      this.#originalRemoveEventListener;
    this.#patched = false;
    console.log("[EventListenerRegistry] ⚠️ addEventListener unpatched");
  }
  #recordListener(
    element,
    type,
    listener,
  ) {
    let elementListeners = this.#listeners.get(element);
    if (!elementListeners) {
      elementListeners = new Map();
      this.#listeners.set(element, elementListeners);
    }
    let typeListeners = elementListeners.get(type);
    if (!typeListeners) {
      typeListeners = new Set();
      elementListeners.set(type, typeListeners);
    }
    typeListeners.add(listener);
  }
  #removeListener(
    element,
    type,
    listener,
  ) {
    const elementListeners = this.#listeners.get(element);
    if (!elementListeners) return;
    const typeListeners = elementListeners.get(type);
    if (!typeListeners) return;
    typeListeners.delete(listener);    if (typeListeners.size === 0) {
      elementListeners.delete(type);
    }  }
  hasListeners(element, eventTypes[]) {
    const elementListeners = this.#listeners.get(element);
    if (!elementListeners || elementListeners.size === 0) {
      return false;
    }
    if (!eventTypes) {
      return true;
    }
    return eventTypes.some((type) => {
      const listeners = elementListeners.get(type);
      return listeners && listeners.size > 0;
    });
  }
  getEventTypes(element) {
    const elementListeners = this.#listeners.get(element);
    if (!elementListeners) return [];
    return Array.from(elementListeners.keys());
  }
  getListenerCount(element, type) {
    const elementListeners = this.#listeners.get(element);
    if (!elementListeners) return 0;
    const typeListeners = elementListeners.get(type);
    return typeListeners ? typeListeners.size : 0;
  }
  getDebugInfo() {
    return {
      patched: this.#patched,      note: "WeakMap is used for automatic memory cleanup. Cannot enumerate elements.",
    };
  }
  getElementDebugInfo(element) {
    const elementListeners = this.#listeners.get(element);
    if (!elementListeners) {
      return {
        element,
        hasListeners: false,
        eventTypes: [],
        totalListeners: 0,
      };
    }
    return {
      element,
      tag: element.tagName,
      className: element.className,
      hasListeners: true,
      eventTypes: Array.from(elementListeners.keys()),
      totalListeners: Array.from(elementListeners.values()).reduce(
        (sum, set) => sum + set.size,
        0,
      ),
    };
  }
}const eventListenerRegistry = new EventListenerRegistry();
const INTERACTION_EVENT_TYPES = [
  "click",
  "dblclick",
  "contextmenu",
  "mousedown",
  "mouseup",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointerup",
  "pointermove",
  "pointerenter",
  "pointerleave",
  "pointerover",
  "pointerout",
  "pointercancel",
];
export function hasAddEventListenerInteractions(element) {
  return eventListenerRegistry.hasListeners(element, INTERACTION_EVENT_TYPES);
}
export function getAddEventListenerInteractions(
  element,
) {
  const allTypes = eventListenerRegistry.getEventTypes(element);
  return allTypes.filter((type) => INTERACTION_EVENT_TYPES.includes(type));
}
export function getAddEventListenerDetail(element) {
  const eventTypes = getAddEventListenerInteractions(element);
  const listeners = {};
  eventTypes.forEach((type) => {
    listeners[type] = eventListenerRegistry.getListenerCount(element, type);
  });
  return {
    hasEvents: eventTypes.length > 0,
    eventTypes,
    listeners,
  };
}
export function getAddEventListenerDebugInfo(element) {
  return eventListenerRegistry.getElementDebugInfo(element);
}
export function initEnhancedEventDetector(targetWindow = window) {
  eventListenerRegistry.patch();  (targetWindow).__eventListenerRegistry__ = {
    hasListeners: hasAddEventListenerInteractions,
    getEventTypes: getAddEventListenerInteractions,
    getDetail: getAddEventListenerDetail,
    getDebugInfo: () => eventListenerRegistry.getDebugInfo(),
    getElementDebugInfo: getAddEventListenerDebugInfo,
  };
  console.log(
    "[EnhancedEventDetector] ✅ Initialized and patched addEventListener",
  );
}
export function cleanupEnhancedEventDetector() {
  eventListenerRegistry.unpatch();}if (typeof window !== "undefined") {
  initEnhancedEventDetector(window);
}