import ApiService from "../../../utils/api/api.service";

class AdminPumpApi extends ApiService {
  static async deletePump(id: string) {
    try {
      const response = await ApiService.delete(
        `aqua/admin/delete_accessory/pump/${id}`
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async editPump(id: string, name: string, maxCapacity: string) {
    try {
      const response = await ApiService.put(
        `aqua/admin/edit_accessory/pump/${id}`,
        {
          pump_name: name,
          max_capacity: maxCapacity,
        }
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async addNewPump(name: string, maxCapacity: string) {
    try {
      const response = await ApiService.post(`aqua/admin/add_accessory/pump`, {
        pump_name: name,
        max_capacity: maxCapacity,
      });
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }
}

export default AdminPumpApi;
