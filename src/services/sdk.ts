import { AuthResponseData, LoginArgs } from "@/pages/api/auth";
import { CreateUserArgs, CreateUserResponseData } from "@/pages/api/create";
import { UserListArgs, UserResponse } from "@/pages/api/view";
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
  public login = (args: LoginArgs) => {
    const data = axios.post<AuthResponseData>("/api/auth", args);
    return data;
  };
  public createUser = (args: CreateUserArgs) => {
    const data = axios.post<CreateUserResponseData>("/api/create", args);
    return data;
  };
  public getUserList = async (args: UserListArgs): Promise<UserResponse> => {
    const query = new URLSearchParams({
      limit: args.limit.toString(),
      offset: args.offset.toString(),
    }).toString();

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/view?${query}`,
      {
        method: "GET",
      }
    );
    return await data.json();
  };
}

const api = ApiSDK.getInstance().getApi();

export default api;
