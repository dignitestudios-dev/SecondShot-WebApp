import axios from "axios";
import Cookies from "js-cookie";

export const baseUrl = "https://backend.mycareertoolbox.com";
// export const baseUrl = "http://192.168.8.122:5000";

const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use((request) => {
  let token = Cookies.get("token");
  request.headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
  };
  return request;
});

instance.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      Cookies.remove("token");
      Cookies.remove("name");
      Cookies.remove("email");

      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default instance;
