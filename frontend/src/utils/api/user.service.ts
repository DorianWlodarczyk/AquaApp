import { UserAdmin } from "../models/admin";
import ApiService from "./api.service";

class UserApi extends ApiService {
  static async isAdmin(): Promise<UserAdmin> {
    try {
      const response = await ApiService.get<UserAdmin>(`aqua/check/admin`);
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }
}

export default UserApi;
