import ApiService from "../../../utils/api/api.service";

class AdminAssetsApi extends ApiService {
  static async deleteAssets(id: string) {
    try {
      const response = await ApiService.delete(
        `aqua/admin/delete_accessory/asset/${id}`
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async editAssets(id: string, name: string) {
    try {
      const response = await ApiService.put(
        `aqua/admin/edit_accessory/asset/${id}`,
        {
          asset_name: name,
        }
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async createAssets(name: string) {
    try {
      const response = await ApiService.post(`aqua/admin/add_accessory/asset`, {
        asset_name: name,
      });
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }
}

export default AdminAssetsApi;
