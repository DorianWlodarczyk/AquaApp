import ApiService from "../../../utils/api/api.service";

class AdminAssetsApi extends ApiService {
  static async deleteAssets(id: string) {}

  static async editAssets(id: string, name: string) {}

  static async createAssets(name: string) {}
}

export default AdminAssetsApi;
