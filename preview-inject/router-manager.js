import { PostMessageClient } from "./post-message";
import { formatRoute } from "./helper";
import { getNextRouter, routerReady } from "./next-router";
import { parseRoutes } from "./parse-routes";
export async function initRouteManager() {
  const postMessageClient = new PostMessageClient(window.parent);
  const routes = await parseRoutes();
  window.REACT_APP_ROUTES = routes;
  postMessageClient.post("routes", {
    routes,
  });
  postMessageClient.on("getRouteInfo", async (data) => {
    return routes;
  });
  await routerReady;
  postMessageClient.on(
    "routeAction",
    async (data: { action; route }) => {
      const router = getNextRouter();
      const { action, route } = data;
      switch (action) {
        case "goForward":
          router.forward();          break;
        case "goBack":
          router.back();          break;
        case "refresh":
          router.refresh();          break;
        case "goTo":
          if (route) {
            router.push(route);          }
          break;
        default:
          console.warn("Unknown action:", action);
      }
    }
  );
  function updateNavigationState() {
    const currentIndex = window.history.state?.index ?? 0;
    const canGoForward = window.history.length > currentIndex + 1;
    const canGoBack = currentIndex > 0;
    const currentRoute = window.location.pathname;
    postMessageClient.post("updateNavigationState", {
      canGoForward,
      canGoBack,
      currentRoute: formatRoute(currentRoute),
    });
  }
  function observeTitleChanges() {
    const titleObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "childList" ||
          mutation.type === "characterData"
        ) {
          postMessageClient.post("titleChanged", {
            title: document.title,
          });
        }
      });
    });
    const titleElement = document.querySelector("title");
    postMessageClient.post("titleChanged", {
      title: document.title,
    });
    if (titleElement) {
      titleObserver.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
    return titleObserver;
  }
  let titleObserver = observeTitleChanges();
  function updateTitleObserver() {
    titleObserver.disconnect();
    setTimeout(() => {
      titleObserver = observeTitleChanges();
    }, 100);
  }
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;
  const originalGo = window.history.go;
  const originalBack = window.history.back;
  const originalForward = window.history.forward;
  window.history.pushState = function (state, title, url) {
    originalPushState.apply(this, arguments);
    updateNavigationState();
    updateTitleObserver();
  };
  window.history.replaceState = function (state, title, url) {
    originalReplaceState.apply(this, arguments);
    updateNavigationState();
    updateTitleObserver();
  };
  window.history.go = function (delta) {
    originalGo.apply(this, arguments);
    setTimeout(() => {
      updateNavigationState();
      updateTitleObserver();
    }, 100);
  };
  window.history.back = function () {
    originalBack.apply(this, arguments);
    setTimeout(() => {
      updateNavigationState();
      updateTitleObserver();
    }, 100);
  };
  window.history.forward = function () {
    originalForward.apply(this, arguments);
    setTimeout(() => {
      updateNavigationState();
      updateTitleObserver();
    }, 100);
  };
  return {
    destroy: () => {
      postMessageClient.destroy();
      titleObserver.disconnect();
    },
  };
}