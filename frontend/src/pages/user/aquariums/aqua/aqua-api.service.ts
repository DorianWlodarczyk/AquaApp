import ApiService from "../../../../utils/api/api.service";
import { AquaInfo } from "../../../../utils/models/aquarium/aqua-info";

class AquaApi extends ApiService {
  static async getAquaInfo(aquaID: string): Promise<AquaInfo | undefined> {
    try {
      const response = await ApiService.get<AquaInfo>(`aqua/${aquaID}`);
      if (response) {
        return response;
      }
    } catch (e) {
      return;
    }

    return;
  }
}

export default AquaApi;
