import ApiService from "../../../../utils/api/api.service";
import AccessoriesData from "../../../../utils/models/accessories/accessories-data";
import { AquaNew } from "../../../../utils/models/aquarium/aqua-new";
import { inputData } from "../../../../utils/models/input-data";

class NewAquariumApi extends ApiService {
  static async editAquarium(
    id: string,
    value: inputData[]
  ): Promise<AquaNew | undefined> {
    const body = {
      name: value.find((item) => item.name === "name")?.value,
      imgID: value.find((item) => item.name === "imgID")?.value,
      width: value.find((item) => item.name === "width")?.value,
      height: value.find((item) => item.name === "height")?.value,
      length: value.find((item) => item.name === "length")?.value,
      heaterID: value.find((item) => item.name === "heater")?.value,
      pumpID: value.find((item) => item.name === "pump")?.value,
      lampID: value.find((item) => item.name === "lamp")?.value,
      assetID: value.find((item) => item.name === "asset")?.value,
      plantID: value.find((item) => item.name === "plant")?.value,
      groundID: value.find((item) => item.name === "ground")?.value,
    };

    try {
      const response = await ApiService.put<AquaNew>(
        `aqua/aquarium_edit/${id}`,
        body
      );
      if (response) return response;
    } catch (e) {
      return;
    }

    return;
  }

  static async fetchAccessoriesData() {
    try {
      const response = await ApiService.get<AccessoriesData>(
        "aqua/accessories/all"
      );
      if (response) {
        return response;
      }
    } catch (e) {
      return;
    }

    return;
  }
}

export default NewAquariumApi;
