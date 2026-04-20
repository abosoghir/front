import { PostMessageClient } from "../post-message";
import { mapErrorStack } from "../source-map";
import { getDebugErrorFromSelector, interceptReactJSX } from "./helper";
interceptReactJSX();
export function initDebugSource() {
  const map = new WeakMap();
  const postMessageClient = new PostMessageClient(window.parent);
  postMessageClient.on(
    "get-element-source",
    async ({ selector }: { selector }) => {
      const result = getDebugErrorFromSelector(selector);
      if (!result) {
        return null;
      }
      const { element, tagName, debugError } = result;
      if (map.has(element)) {
        return map.get(element);
      }
      const errorMappingResult = await mapErrorStack(debugError, 10, tagName);
      if (!errorMappingResult) {
        return null;
      }
      const sourceContext = errorMappingResult.sourceContext.filter(
        (item) => !item.file.includes("node_modules")
      );
      const sourceContextInfo = {
        ...sourceContext[0],
        domInfo: {
          tagName: element.tagName,
          textContent: element.textContent.slice(0, 300),
        },
      };
      map.set(element, sourceContextInfo);
      return sourceContextInfo;
    }
  );
  return () => {
    postMessageClient.destroy();
  };
}