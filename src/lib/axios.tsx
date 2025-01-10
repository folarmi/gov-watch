import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const newConfig = { ...config };
        newConfig.headers.Authorization = `Bearer ${token}`;
        return newConfig;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error?.response?.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      localStorage.clear();
      sessionStorage.removeItem("token");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default api;

// {
//   "title": "Test Article",
//   "authorName": "Test Author",
//   "snippet": "Testing testing",
//   "category": 5,
//   "imageCaption": "Test Image",
//   "state": "Ethan Spears",
//   "lga": "Alexander Calderon",
//   "lcda": "Lane Vincent",
//   "ward": "Idona Mcneil",
//   "datePromiseMade": "2024-09-04",
//   "promisedDeadline": "2024-09-20",
//   "datePromiseFulfilled": "2024-09-11",
//   "mda": "Talon Bell",
//   "reference": "Dolorum nostrum volu",
//   "link": "fbbfb",
//   "country": "Nigeria",
//   "isFederal": false,
//   "isPromise": false,
//   "contributorPublicId": "a7e36778-2fec-4b6e-8569-dbe47778dff0",
//   "image": "http://govwatch.runasp.net/Uploads/50a412c7-2ce1-4d2a-9422-514aee6077d6_Screenshot 2024-08-15 at 10.19.41.png",
//   "isPromiseFulfilled": false,
// "tags": [
//     "test",
//     "testTwo"
// ],
//   "article": "<p>n xcnc nxcv cnbc </p>"
// }
