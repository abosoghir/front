
export class FiberDebugger {
  static getFiberFromDOMNode(element) {
    if (!element) return null;    const key = Object.keys(element).find(
      (key) =>
        key.startsWith("__reactFiber$") ||
        key.startsWith("__reactInternalInstance$")
    );
    return key ? (element)[key] : null;
  }
}
export default FiberDebugger;