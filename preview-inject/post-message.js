const DEFAULT_TIMEOUT = 1000;
const timeoutTag = Symbol('postMessageResponseTimeout');

let id = 0;

const DEFAULT_ORIGIN = '*';

export class PostMessageClient {
  constructor(client, options) {
    this.client = client;
    this.baseTimeout = options?.timeout || DEFAULT_TIMEOUT;
    this.waitRes = new Map();
    this.removeListeners = new Set();
    const msCb = this.emitResponse.bind(this);
    this.clear = () => {
      window.removeEventListener('message', msCb);
    };
    window.addEventListener('message', msCb);
  }

  destroy() {
    this.clear();
    this.removeListeners.forEach((fn) => fn());
  }

  isTimeout(data) {
    return data === timeoutTag;
  }

  post(name, data, options) {
    id++;
    const { timeout, origin = DEFAULT_ORIGIN } = options || {};
    this.client.postMessage({ data, id, type: name }, origin);
    return new Promise((resolve) => {
      this.waitRes.set(id, (d) => {
        resolve(d);
      });
      setTimeout(() => {
        this.waitRes.delete(id);
        resolve(timeoutTag);
      }, timeout || this.baseTimeout);
    });
  }

  on(name, callback, options) {
    const { once, origin = DEFAULT_ORIGIN } = options || {};
    const msCb = async (e) => {
      const { id, type, data } = e.data;
      let res;
      if (type === name) {
        res = await callback(data);
        console.log(name, once, res, data);
        if ((id && origin === e.origin) || origin === DEFAULT_ORIGIN) {
          e.source?.postMessage(
            {
              fromType: name,
              id,
              data: res
            },
            e.origin
          );
        }
        if (once) {
          removeCb();
        }
      }
    };

    window.addEventListener('message', msCb);
    const removeCb = () => {
      window.removeEventListener('message', msCb);
      this.removeListeners.delete(removeCb);
    };
    this.removeListeners.add(removeCb);
    return removeCb;
  }

  emitResponse(e) {
    const message = e.data;
    const { id, data } = message;
    const resCb = this.waitRes.get(id);
    if (resCb) {
      resCb(data);
    }
  }
}
