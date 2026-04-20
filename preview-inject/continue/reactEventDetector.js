
const REACT_EVENT_PROPS = [  "onClick",
  "onDoubleClick",
  "onContextMenu",  "onMouseDown",
  "onMouseUp",
  "onPointerDown",
  "onPointerUp",
  "onTouchStart",
  "onTouchEnd",  "onDragStart",
  "onDrop",  "onChange",
  "onSubmit",  "onKeyDown",
  "onKeyUp",
];
function getFiberNode(element) {  const key = Object.keys(element).find(
    (key) =>
      key.startsWith("__reactFiber$") ||
      key.startsWith("__reactInternalInstance$"),
  );
  if (key) {
    return (element)[key] as ReactFiberNode;
  }
  return null;
}
function hasInteractionPropsInObject(props) {
  if (!props || typeof props !== "object") return false;
  return REACT_EVENT_PROPS.some((eventProp) => {
    const value = props[eventProp];
    return typeof value === "function";
  });
}
function getInteractionEvents(props) {
  if (!props || typeof props !== "object") return [];
  return REACT_EVENT_PROPS.filter((eventProp) => {
    const value = props[eventProp];
    return typeof value === "function";
  });
}
export function hasReactInteractionEvents(element) {
  let fiber = getFiberNode(element);
  while (fiber) {    if (
      fiber.memoizedProps &&
      hasInteractionPropsInObject(fiber.memoizedProps)
    ) {
      return true;
    }    fiber = fiber.return || null;
  }
  return false;
}
export function getReactInteractionEventsDetail(element): {
  hasEvents;
  events: Array<{
    componentName;
    eventNames[];
    props;
  }>;
} {
  const result: {
    hasEvents;
    events: Array<{
      componentName;
      eventNames[];
      props;
    }>;
  } = {
    hasEvents: false,
    events: [],
  };
  let fiber = getFiberNode(element);
  while (fiber) {
    if (fiber.memoizedProps) {
      const eventNames = getInteractionEvents(fiber.memoizedProps);
      if (eventNames.length > 0) {
        result.hasEvents = true;        const componentName =
          fiber.type?.displayName ||
          fiber.type?.name ||
          fiber.elementType?.name ||
          "Unknown";
        result.events.push({
          componentName,
          eventNames,
          props: fiber.memoizedProps,
        });
      }
    }
    fiber = fiber.return || null;
  }
  return result;
}
export function hasReactInteractionEventsOnSelf(element) {
  const fiber = getFiberNode(element);
  if (!fiber || !fiber.memoizedProps) {
    return false;
  }
  return hasInteractionPropsInObject(fiber.memoizedProps);
}
export function injectReactEventDetector(targetWindow = window) {
  (targetWindow).__reactEventDetector__ = {
    hasReactInteractionEvents,
    getReactInteractionEventsDetail,
    hasReactInteractionEventsOnSelf,
    REACT_EVENT_PROPS,
  };
  console.log("[ReactEventDetector] Injected to window.__reactEventDetector__");
}if (typeof window !== "undefined" && !import.meta.env?.SSR) {
  injectReactEventDetector(window);
}