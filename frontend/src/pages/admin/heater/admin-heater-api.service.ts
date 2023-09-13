import ApiService from "../../../utils/api/api.service";

class AdminHeaterApi extends ApiService {
  static async deleteHeater(id: string) {
    try {
      const response = await ApiService.delete(
        `aqua/admin/delete_accessory/heater/${id}`
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async editHeater(id: string, name: string, maxCapacity: string) {
    try {
      const response = await ApiService.put(
        `aqua/admin/edit_accessory/heater/${id}`,
        {
          heater_name: name,
          max_capacity: maxCapacity,
        }
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async addNewHeater(name: string, maxCapacity: string) {
    try {
      const response = await ApiService.post(
        `aqua/admin/add_accessory/heater`,
        {
          heater_name: name,
          max_capacity: maxCapacity,
        }
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }
}

export default AdminHeaterApi;
