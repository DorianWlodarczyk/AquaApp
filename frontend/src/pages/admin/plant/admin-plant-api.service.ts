import ApiService from "../../../utils/api/api.service";

class AdminPlantApi extends ApiService {
  static async deletePlant(id: string) {}

  static async editPlant(id: string, name: string) {}

  static async createPlant(name: string) {}
}

export default AdminPlantApi;
