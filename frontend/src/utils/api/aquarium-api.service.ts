import { AquariumData } from "../../pages/user/aquariums/index/models/aquarium.interface";
import { AquariumNameAndImg } from "../models/aquarium/aquarium-name-and-img";
import ApiService from "./api.service";

class AquariumApi extends ApiService {
  static async getNameAndImg(aquaID: string): Promise<AquariumNameAndImg> {
    try {
      const response = await ApiService.get<AquariumNameAndImg>(
        `aqua/${aquaID}/name`,
        {}
      );
      if (response) return response;
    } catch (e) {
      return { name: "a", imgID: "1" };
    }
    return { name: "a", imgID: "1" };
  }

  static async getAquariumsList(): Promise<AquariumData[]> {
    try {
      const response = await ApiService.get<AquariumData[]>("aqua/aquariums");
      if (response) return response;
    } catch (e) {
      return [];
    }
    return [];
  }
}

export default AquariumApi;
