export const formatRoute = (route) => {
  const basePath = __BASE_PATH__;
  if (basePath && route.startsWith(basePath)) {
    return route.replaceAll(basePath, "") || "/";
  }
  return route || "/";
};

export const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
