import { NavigateFunction } from "react-router-dom";
 async function setupNextRouter() {
  const navigatePromise = await import("../src/router").then(m => m.navigatePromise).catch((e) => {
    console.error(e);
    return Promise.resolve(() => {})
  });
  await navigatePromise;
  window.REACT_APP_ROUTER = {
      push: (url, options) => {
        window.REACT_APP_NAVIGATE(url, options);
      },
      replace: (url, as, options) => {
        window.REACT_APP_NAVIGATE(url, {replace: true, ...options});
      },
      forward: () => {
        window.REACT_APP_NAVIGATE(1);
      },
      back: () => {
        window.REACT_APP_NAVIGATE(-1);
      },
      refresh: () => {
        window.REACT_APP_NAVIGATE(0);
      },
      prefetch: (href, options) => {
        window.REACT_APP_NAVIGATE(href, options);
      },
    }
  }
  export const routerReady = new Promise((resolve)=>{
    setupNextRouter().then(()=>{
      resolve(window.REACT_APP_ROUTER)
    })
  })
export const getNextRouter = (): NextRouter => {
  return window.REACT_APP_ROUTER
};