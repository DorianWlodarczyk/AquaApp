import ApiService from "../../../../utils/api/api.service";
import { AquariumData } from "./models/aquarium.interface";

class AquariumListApi extends ApiService {
  static async getAquariumList(): Promise<AquariumData[]> {
    await new Promise((r) => setTimeout(r, 2000));

    const output: AquariumData[] = [];
    for (let i = 0; i < Math.floor(Math.random() * 1000); i++) {
      output.push({
        id: `${i}`,
        name: `Akwarium #${i}`,
        imgID: `${Math.floor(Math.random() * 12)}`,
        fishNumber: Math.floor(Math.random() * 100),
      });
    }
    return output;
  }
}

export default AquariumListApi;
