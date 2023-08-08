import ApiService from "../../../utils/api/api.service";

class AdminGroundApi extends ApiService {
  static async deleteGround(id: string) {}

  static async editGround(id: string, name: string) {}

  static async createGround(name: string) {}
}

export default AdminGroundApi;
