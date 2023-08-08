import ApiService from "../../../utils/api/api.service";

class AdminLampApi extends ApiService {
  static async deleteLamp(id: string) {}

  static async editLamp(id: string, name: string) {}

  static async createLamp(name: string) {}
}

export default AdminLampApi;
