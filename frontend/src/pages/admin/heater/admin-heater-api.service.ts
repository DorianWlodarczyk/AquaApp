import ApiService from "../../../utils/api/api.service";

class AdminHeaterApi extends ApiService {
  static async deleteHeater(id: string) {}

  static async editHeater(id: string, name: string, maxCapacity: string) {}

  static async addNewHeater(name: string, maxCapacity: string) {}
}

export default AdminHeaterApi;
