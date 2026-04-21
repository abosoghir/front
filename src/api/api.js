import axios from 'axios';

const BASE_URL = 'https://wasla-v1.runasp.net';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor: attach JWT token ──────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wasla_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: unwrap Result<T> + auto-refresh on 401 ──
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    // Unwrap the Result pattern — return just the data payload
    const body = response.data;
    if (body && typeof body.isSuccess !== 'undefined') {
      if (body.isSuccess) {
        return typeof body.value !== 'undefined' ? body.value : body;
      }
      // Server returned a business error inside Result pattern
      const err = new Error(body.error?.description || 'Request failed');
      err.code = body.error?.code || 'UNKNOWN';
      err.statusCode = body.statusCode;
      return Promise.reject(err);
    }
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already retried, attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request while a refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const storedToken = localStorage.getItem('wasla_token');
      const storedRefreshToken = localStorage.getItem('wasla_refresh_token');

      if (!storedRefreshToken) {
        isRefreshing = false;
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Call refresh endpoint directly (bypass interceptors)
        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
          token: storedToken,
          refreshToken: storedRefreshToken,
        });

        if (data.isSuccess && typeof data.value !== 'undefined') {
          const authData = data.value;
          localStorage.setItem('wasla_token', authData.token);
          localStorage.setItem('wasla_refresh_token', authData.refreshToken);
          localStorage.setItem('wasla_refresh_token_expiration', authData.refreshTokenExpiration);
          localStorage.setItem('wasla_user', JSON.stringify(authData));

          api.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
          originalRequest.headers.Authorization = `Bearer ${authData.token}`;

          processQueue(null, authData.token);
          return api(originalRequest);
        } else {
          processQueue(new Error('Refresh failed'), null);
          clearAuth();
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Extract a readable error message from the response
    if (error.response?.data) {
      const body = error.response.data;
      if (body.error) {
        const err = new Error(body.error.description || 'Request failed');
        err.code = body.error.code;
        err.statusCode = body.statusCode || error.response.status;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

function clearAuth() {
  localStorage.removeItem('wasla_token');
  localStorage.removeItem('wasla_refresh_token');
  localStorage.removeItem('wasla_refresh_token_expiration');
  localStorage.removeItem('wasla_user');
}

export { clearAuth };
export default api;
