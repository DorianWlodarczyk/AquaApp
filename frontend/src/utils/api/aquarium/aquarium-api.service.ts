import { AquariumNameAndImg } from "../../models/aquarium/aquarium-name-and-img";
import ApiService from "../api.service";

class AquariumApi extends ApiService {
  static async getNameAndImg(aquaID: string): Promise<AquariumNameAndImg> {
    return {
      name: `akwarium ${aquaID}`,
      imgID: `${Math.floor(Math.random() * 10)}`,
    };
  }
}

export default AquariumApi;
