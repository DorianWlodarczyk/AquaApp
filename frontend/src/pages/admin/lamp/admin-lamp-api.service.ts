import ApiService from "../../../utils/api/api.service";

class AdminLampApi extends ApiService {
  static async deleteLamp(id: string) {
    try {
      const response = await ApiService.delete(
        `aqua/admin/delete_accessory/lamp/${id}`
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async editLamp(id: string, name: string) {
    try {
      const response = await ApiService.put(
        `aqua/admin/edit_accessory/lamp/${id}`,
        {
          lamp_name: name,
        }
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async createLamp(name: string) {
    try {
      const response = await ApiService.post(`aqua/admin/add_accessory/lamp`, {
        lamp_name: name,
      });
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }
}

export default AdminLampApi;
