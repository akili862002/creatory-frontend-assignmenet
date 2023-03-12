import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (process.env.NODE_ENV === "development")
      toast.error("Something was wrong!\n" + error.message, {
        duration: 10000,
      });
    return Promise.reject(error);
  }
);
