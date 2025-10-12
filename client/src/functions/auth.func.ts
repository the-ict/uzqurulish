import { AxiosError, isAxiosError } from "axios";
import { axiosClient } from "../configs/api";
import type {
  IAuthLoginRequest,
  IAuthRegisterRequest,
} from "../types/auth.types";

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

class AuthFunctions {
  public isAuthenticated(): boolean {
    return localStorage.getItem("accessToken") ? true : false;
  }
  public saveToken(tokens: ITokens): string {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    return "DONE";
  }

  public logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  }
  public async register(user: IAuthRegisterRequest): Promise<AxiosError | undefined> {
    try {
      const response = await axiosClient.post("/auth/register", user);

      if (response.data) {
        window.location.replace("/login");
      }
    } catch (error) {
      if (isAxiosError(error)) return error;
      return undefined;
    }
  }

  public async login(user: IAuthLoginRequest): Promise<AxiosError | undefined> {
    try {
      const response = await axiosClient.post("/auth/login", {
        email: user.email,
        password: user.password,
      });
      if (response.data) {
        this.saveToken(response.data);

        window.location.replace("/dashboard");
      }
    } catch (error) {
      if (isAxiosError(error)) return error;
      return undefined;
    }
  }

  public async resetPassword(email: string): Promise<AxiosError | boolean>{
    try {
      await axiosClient.post("/auth/reset", { email });
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async setNewPassword(token: string, password: string): Promise<AxiosError | boolean>{
    try {
      await axiosClient.post("/auth/reset/confirm", { token, password });
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async confirmSetNewPassword({
    password,
    token
  }: {password: string;
    token: string;
  }) {
    try {
      const response = await axiosClient.post("/auth/reset/confirm", {
        password: password,
      }, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })

      console.log(response.data)
    } catch (error) {
      throw new Error("Failed to confirm password!")
    }
  }
}

export const authFunctions = new AuthFunctions();
