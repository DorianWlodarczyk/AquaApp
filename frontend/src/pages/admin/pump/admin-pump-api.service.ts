import ApiService from "../../../utils/api/api.service";

class AdminPumpApi extends ApiService {
  static async deletePump(id: string) {}

  static async editPump(id: string, name: string, maxCapacity: string) {}

  static async addNewPump(name: string, maxCapacity: string) {}
}

export default AdminPumpApi;
