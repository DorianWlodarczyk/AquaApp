import { AquariumData } from "../../pages/user/aquariums/index/models/aquarium.interface";
import { AquariumNameAndImg } from "../models/aquarium/aquarium-name-and-img";
import ApiService from "./api.service";

class AquariumApi extends ApiService {
  static async getNameAndImg(aquaID: string): Promise<AquariumNameAndImg> {
    return {
      name: `akwarium ${aquaID}`,
      imgID: `${Math.floor(Math.random() * 10)}`,
    };
  }

  static async getAquariumsList(): Promise<AquariumData[]> {
    const response = await ApiService.get<AquariumData[]>("aquariums");
    console.log(
      "🚀 ~ file: aquarium-api.service.ts:15 ~ AquariumApi ~ getAquariumsList ~ response:",
      response
    );

    // await new Promise((r) => setTimeout(r, 2000));

    // const output: AquariumData[] = [];
    // for (let i = 0; i < Math.floor(Math.random() * 1000); i++) {
    //   output.push({
    //     id: `${i}`,
    //     name: `Akwarium #${i}`,
    //     imgID: `${Math.floor(Math.random() * 12)}`,
    //     fishNumber: Math.floor(Math.random() * 100),
    //   });
    // }
    if (response) return response;
    else return [];
  }
}

export default AquariumApi;
