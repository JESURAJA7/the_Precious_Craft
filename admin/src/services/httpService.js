import axios from "axios";
import Cookies from "js-cookie";

// ✅ Automatically uses Vite proxy (http://localhost:5055 via vite.config.js)
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL, // important: only the prefix, not full URL
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
//console.log("API BASE URL", import.meta.env.VITE_APP_API_BASE_URL);
// ✅ Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const adminInfo = Cookies.get("adminInfo")
      ? JSON.parse(Cookies.get("adminInfo"))
      : null;

    const company = Cookies.get("company") || null;

    if (adminInfo?.token) {
      config.headers.Authorization = `Bearer ${adminInfo.token}`;
    }

    if (company) {
      config.headers.company = company;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle all responses uniformly
const responseBody = (response) => response.data;

// ✅ API Request methods
const requests = {
  get: (url, params, headers) =>
    instance.get(url, { params, headers }).then(responseBody),

  post: (url, body, headers) =>
    instance.post(url, body, { headers }).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, { headers }).then(responseBody),

  patch: (url, body, headers) =>
    instance.patch(url, body, { headers }).then(responseBody),

  delete: (url, headers) =>
    instance.delete(url, { headers }).then(responseBody),
};

export default requests;
