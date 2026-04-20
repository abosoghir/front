import { PostMessageClient } from "./post-message";
import { formatRoute } from "./helper";
import { getNextRouter, routerReady } from "./next-router";
const postMessageClient = new PostMessageClient(window.parent);
const postRouteWillChangeMessage = async (
  route,
  options?: { timeout }
) => {
  await postMessageClient.post(
    "routeWillChange",
    {
      next: formatRoute(route),
    },
    options
  );
};
function processAnchor(url) {
  const anchor = document.querySelector(url);
  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth" });
  }
}
function processWindowOpen() {
  const originalWindowOpen = window.open;
  window.open = function (
    url | URL | undefined,
    _target,
    features
  ) {
    if (url && typeof url === "string" && url.startsWith("#")) {
      processAnchor(url);
      return null;
    }
    originalWindowOpen(url, "_blank", features);
    return null;
  };
  return () => {
    window.open = originalWindowOpen;
  };
}
function processA() {
  const clickHandler = async (event) => {
    const target = event.target;
    const closest = target.closest("a");
    if (!closest) return;
    if (closest.tagName !== "A") return;
    const href = closest.getAttribute("href");
    if (!href) return;    if (["#", "javascript(0)", ""].includes(href)) {
      return;
    }
    if (href.startsWith("#")) {
      return;
    }
    event.preventDefault();
    if (href.startsWith("/")) {
      const router = getNextRouter();
      await postRouteWillChangeMessage(href, { timeout: 500 });
      const formatHref = formatRoute(href);
      router.push(formatHref);
      return;
    }
    window.open(closest.href, "_blank");
  };
  window.addEventListener("click", clickHandler, true);
  return () => {
    window.removeEventListener("click", clickHandler, true);
  };
}
const isExternalLink = (url) => {
  return url.startsWith("http://") || url.startsWith("https://");
};
function isGoogleRelatedAuth(url | URL | null | undefined) {
  if (!url || typeof url !== 'string') return false;
  return (
    url.indexOf('accounts.google.com') !== -1 ||
    url.indexOf('googleapis.com/oauth') !== -1 ||
    (url.indexOf('/auth/') !== -1 && url.indexOf('provider=google') !== -1)
  );
}
function processRouter() {
  const loadHandler = () => {
    const router = getNextRouter();
    const originalPush = router.push;
    router.push = async function (url, as, options) {
      if (isExternalLink(url)) {
        window.open(url, "_blank");
        return Promise.resolve(false);
      }
      await postRouteWillChangeMessage(url, { timeout: 500 });
      return originalPush.call(this, url, as, options);
    };
    const originalReplace = router.replace;
    router.replace = async function (url, as, options) {
      if (isExternalLink(url)) {
        window.open(url, "_blank");
        return Promise.resolve(false);
      }
      await postRouteWillChangeMessage(url, { timeout: 500 });
      return originalReplace.call(this, url, as, options);
    };
  };
  window.addEventListener("load", loadHandler);
  return () => {
    window.removeEventListener("load", loadHandler);
  };
}
function processNavigationAPI() {
  if (!('navigation' in window)) {
    return () => {};
  }
  const navigateHandler = (e: { destination: { url } }) => {
    if (isGoogleRelatedAuth(e.destination.url)) {
      postMessageClient.post('google-auth-blocked', { url: e.destination.url || '' });
    }
  };
  (window).navigation.addEventListener('navigate', navigateHandler);
  return () => {
    (window).navigation.removeEventListener('navigate', navigateHandler);
  };
}
export async function initLinkManager() {
  await routerReady;
  const windowOpen = processWindowOpen();
  const a = processA();
  const router = processRouter();
  const navigationAPI = processNavigationAPI();
  return () => {
    postMessageClient.destroy();
    windowOpen();
    a();
    router();
    navigationAPI();
  };
}