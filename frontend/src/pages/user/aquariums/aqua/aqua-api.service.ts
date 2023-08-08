import ApiService from "../../../../utils/api/api.service";
import { AquaInfo } from "../../../../utils/models/aquarium/aqua-info";

class AquaApi extends ApiService {
  static async getAquaInfo(aquaID: string): Promise<AquaInfo> {
    await new Promise((r) => setTimeout(r, 500));

    return {
      fishNumber: 69,
      width: 20,
      height: 20,
      length: 20,
      aquaName: "Nazwa Akwarium",
      aquaImg: "1",
      heaterName: "Nazwa Grzałki",
      lampName: "Nazwa Lampy",
      pumpName: "Nazwa Pompy",
      assetName: "Nazwa Dodatku",
      plantName: "Nazwa Rośliny",
      groundName: "Nazwa Podłoża",
      history: [
        {
          id: 0,
          time: "2022-03-16",
          text: "Log 1",
        },
        {
          id: 1,
          time: "2022-03-17",
          text: "Log 2",
        },
        {
          id: 2,
          time: "2022-03-18",
          text: "Log 3",
        },
        {
          id: 3,
          time: "2022-03-19",
          text: "Log 4",
        },
      ],
    };
  }
}

export default AquaApi;
