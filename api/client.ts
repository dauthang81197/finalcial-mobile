import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store/useAuthStore";
const BaseURL = "https://api.thanghub.com/api/v1/";
const apiCommon: AxiosRequestConfig = {
  baseURL: BaseURL,
  timeout: 10000,
};
export const apiWithAuth: AxiosInstance = axios.create({
  ...apiCommon,
});

apiWithAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const apiWithNoAuth: AxiosInstance = axios.create({
  ...apiCommon,
});

export default { apiWithAuth, apiWithNoAuth };
