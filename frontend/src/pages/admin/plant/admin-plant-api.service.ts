import ApiService from "../../../utils/api/api.service";

class AdminPlantApi extends ApiService {
  static async deletePlant(id: string) {
    try {
      const response = await ApiService.delete(
        `aqua/admin/delete_accessory/plant/${id}`
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async editPlant(id: string, name: string) {
    try {
      const response = await ApiService.put(
        `aqua/admin/edit_accessory/plant/${id}`,
        {
          plant_name: name,
        }
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async createPlant(name: string) {
    try {
      const response = await ApiService.post(`aqua/admin/add_accessory/plant`, {
        plant_name: name,
      });
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }
}

export default AdminPlantApi;
