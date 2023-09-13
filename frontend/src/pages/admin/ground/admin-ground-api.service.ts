import ApiService from "../../../utils/api/api.service";

class AdminGroundApi extends ApiService {
  static async deleteGround(id: string) {
    try {
      const response = await ApiService.delete(
        `aqua/admin/delete_accessory/ground/${id}`
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async editGround(id: string, name: string) {
    try {
      const response = await ApiService.put(
        `aqua/admin/edit_accessory/ground/${id}`,
        {
          ground_name: name,
        }
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async createGround(name: string) {
    try {
      const response = await ApiService.post(
        `aqua/admin/add_accessory/ground`,
        {
          ground_name: name,
        }
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }
}

export default AdminGroundApi;
