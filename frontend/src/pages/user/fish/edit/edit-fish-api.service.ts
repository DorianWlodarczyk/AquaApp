import ApiService from "../../../../utils/api/api.service";
import { FishData } from "../../../../utils/models/fish/fish-data";

class EditFishApi extends ApiService {
  static async getFishData(id: string): Promise<FishData | undefined> {
    try {
      const response = await ApiService.get<FishData>(`aqua/fish/${id}`);
      if (response) {
        return response;
      }
    } catch (e) {
      return;
    }

    return;
  }

  static async saveEditFish(
    id: string,
    name: string,
    species: string,
    state: boolean
  ) {
    const body = {
      name,
      id: species,
      state,
    };

    try {
      const response = await ApiService.put<string>(`aqua/fish/${id}`, body);

      if (response) return response;
    } catch (e) {
      return "";
    }

    return "69";
  }
}

export default EditFishApi;
