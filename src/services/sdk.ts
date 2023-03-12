import { AuthResponseData } from "@/pages/api/auth";
import axios from "axios";

export class ApiSDK {
  private static instance: ApiSDK;
  private static api: Api;

  private constructor() {
    ApiSDK.api = new Api();
  }

  public static getInstance(): ApiSDK {
    if (!ApiSDK.instance) {
      ApiSDK.instance = new ApiSDK();
    }
    return ApiSDK.instance;
  }

  public getApi(): Api {
    return ApiSDK.api;
  }
}

class Api {
  public login = (args: { username: string; password: string }) => {
    const data = axios.post<AuthResponseData>("/api/auth", args);
    return data;
  };
}

const api = ApiSDK.getInstance().getApi();

export default api;
