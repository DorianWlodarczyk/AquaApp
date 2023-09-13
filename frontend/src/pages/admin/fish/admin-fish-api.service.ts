import ApiService from "../../../utils/api/api.service";

class AdminFishApi extends ApiService {
  static async deleteSpecies(id: string) {
    try {
      const response = await ApiService.delete(
        `aqua/admin/remove_species/${id}`,
        {}
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async editSpecies(id: string, name: string) {
    try {
      const response = await ApiService.put(`aqua/admin/edit_species/${id}`, {
        fish_name: name,
      });
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async addSpecies(name: string) {
    try {
      const response = await ApiService.post(`aqua/admin/speciess`, {
        fish_name: name,
      });
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async addConflict(firstID: string, secondID: string) {
    try {
      const response = await ApiService.post(`aqua/admin/conflict`, {
        firstID,
        secondID,
      });
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }

  static async deleteConflict(firstID: string, secondID: string) {
    try {
      const response = await ApiService.delete(
        `aqua/admin/conflicts/${firstID}/${secondID}`
      );
      if (response) return response;
    } catch (e) {
      return { isAdmin: false };
    }
    return { isAdmin: false };
  }
}

export default AdminFishApi;
