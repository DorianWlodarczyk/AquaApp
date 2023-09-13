import ApiService from "../../../../utils/api/api.service";

class NewFishApi extends ApiService {
  static async saveNewFish(
    name: string,
    species: string,
    state: string,
    aquaID: string
  ) {
    const body = {
      name,
      species,
      state,
      aquaID,
    };

    try {
      const response = await ApiService.post<string>("aqua/fish", body);

      if (response) return response;
    } catch (e) {
      return "";
    }

    return "69";
  }
}

export default NewFishApi;
