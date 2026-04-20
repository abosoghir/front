
import { PostMessageClient } from "../post-message";
import { initEnhancedEventDetector } from "./enhancedEventDetector";
import { injectReactEventDetector } from "./reactEventDetector";
import {
  hasInteractionEvents,
  hasInteractionEventsOnSelf,
  getInteractionEventsDetail,
  checkBySelector,
  checkByPoint,
  checkMultiple,
  checkMultipleSelectors,
} from "./interactionDetector";
const VERSION = "1.0.0";
function initGlobalAPI() {
  window.__interactionDetector__ = {    hasInteractionEvents,
    hasInteractionEventsOnSelf,
    getDetail: getInteractionEventsDetail,    checkBySelector,
    checkByPoint,
    checkMultiple,
    checkMultipleSelectors,    version: VERSION,
  };
  console.log(`[InteractionDetector] Global API initialized (v${VERSION})`);
}
function initPostMessageListener() {
  const client = new PostMessageClient(window.parent);  client.on(
    "checkInteraction",
    (data: { selector; x; y }) => {
      const { selector, x, y } = data || {};      if (selector) {
        return checkBySelector(selector);
      }      if (typeof x === "number" && typeof y === "number") {
        return checkByPoint(x, y);
      }
      return { error: "Invalid params: need selector or (x, y)" };
    },
  );  client.on("checkMultipleSelectors", (data: { selectors[] }) => {
    const { selectors } = data || {};
    if (!selectors || !Array.isArray(selectors)) {
      return { error: "selectors array is required" };
    }
    return checkMultipleSelectors(selectors);
  });
  console.log("[InteractionDetector] PostMessage listener initialized");
}
export function initContinueModule() {  initEnhancedEventDetector();  injectReactEventDetector();  initGlobalAPI();  initPostMessageListener();
  console.log("[Continue] Module fully initialized");
}export {
  hasInteractionEvents,
  hasInteractionEventsOnSelf,
  getInteractionEventsDetail,
  checkBySelector,
  checkByPoint,
  checkMultiple,
  checkMultipleSelectors,
};