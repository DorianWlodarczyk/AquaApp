import ApiService from "../../../../utils/api/api.service";
import { FishData } from "../../../../utils/models/fish/fish-data";

class EditFishApi extends ApiService {
  static async getFishData(id: string): Promise<FishData | undefined> {
    try {
      const response = await ApiService.get<FishData>(`aqua/fish/${id}`);
      if (response) {
        console.log(
          "🚀 ~ file: fish-api.service.ts:60 ~ FishApi ~ getAquariumsWithFish ~ response:",
          response
        );
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
    state: string
  ) {
    console.log(
      JSON.stringify(
        { id: id, name: name, species: species, state: state },
        null,
        2
      )
    );
    alert(
      JSON.stringify(
        { id: id, name: name, species: species, state: state },
        null,
        2
      )
    );
  }
}

export default EditFishApi;
