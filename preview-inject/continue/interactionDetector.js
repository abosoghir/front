
import {
  hasReactInteractionEvents,
  getReactInteractionEventsDetail,
  hasReactInteractionEventsOnSelf,
} from "./reactEventDetector";
import {
  hasAddEventListenerInteractions,
  getAddEventListenerDetail,
} from "./enhancedEventDetector";
export function hasInteractionEvents(element) {
  if (!element) return false;
  return (
    hasReactInteractionEvents(element) ||
    hasAddEventListenerInteractions(element)
  );
}
export function hasInteractionEventsOnSelf(element) {
  if (!element) return false;
  return (
    hasReactInteractionEventsOnSelf(element) ||
    hasAddEventListenerInteractions(element)
  );
}
export function getInteractionEventsDetail(
  element,
) {
  const reactDetail = getReactInteractionEventsDetail(element);
  const nativeDetail = getAddEventListenerDetail(element);
  return {
    hasEvents: reactDetail.hasEvents || nativeDetail.hasEvents,
    react: reactDetail,
    native: nativeDetail,
  };
}
export function checkBySelector(selector) {
  if (!selector) {
    return { error: "selector is required" };
  }
  const element = document.querySelector(selector);
  if (!element) {
    return { error: "Element not found", selector };
  }
  const detail = getInteractionEventsDetail(element);
  return {
    selector,
    hasEvents: detail.hasEvents,  };
}
export function checkByPoint(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    return { error: "x and y must be numbers" };
  }
  const element = document.elementFromPoint(x, y);
  if (!element) {
    return { error: "No element at point", x, y };
  }
  const detail = getInteractionEventsDetail(element);
  return {
    x,
    y,
    hasEvents: detail.hasEvents,  };
}
export function checkMultiple(
  elements,
) {
  return elements.map((element) => ({
    element,
    hasEvents: hasInteractionEvents(element),
  }));
}
export function checkMultipleSelectors(
  selectors[],
) {
  return selectors.map((selector) => ({
    selector,
    result: checkBySelector(selector),
  }));
}