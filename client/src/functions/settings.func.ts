import { isAxiosError, type AxiosError } from "axios";
import { axiosClient } from "../configs/api";
import type { ISettingsUpdateProfile, IGetProfileInfoResponse } from "../types/settings.types";

class SettingsFunctions {
  public async getProfileInfo(): Promise<IGetProfileInfoResponse> {
    const response = await axiosClient.get("/auth/profile");
    return response.data;
  }

  public async updateProfile(user: ISettingsUpdateProfile) {
    try {
      const response = await axiosClient.put("/auth/profile", user);

      console.log(response.data, "response data")
    } catch (error) {
      return error;
    }
  }
}

export default SettingsFunctions;
