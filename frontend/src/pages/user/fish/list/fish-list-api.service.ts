import ApiService from "../../../../utils/api/api.service";
import { SpeciesData } from "../../../../utils/models/fish/species-data";

class FishListApi extends ApiService {
  static async getSpecies(): Promise<SpeciesData[]> {
    await new Promise((r) => setTimeout(r, 100));

    return [
      {
        id: "0",
        name: "Gupik",
      },
      {
        id: "1",
        name: "Barwniak czerwonobrzuchy",
      },
      {
        id: "2",
        name: "Wielkopłetwy",
      },
      {
        id: "3",
        name: "Skalar",
      },
      {
        id: "4",
        name: "Brzanki",
      },
    ];
  }

  static async getFishList(aquaID?: string): Promise<any> {
    await new Promise((r) => setTimeout(r, 100));

    if (aquaID) {
      this.getFish(aquaID);
    } else {
      this.getAllFish();
    }
  }

  private static async getAllFish() {}

  private static async getFish(aquaID: string) {}
}

export default FishListApi;
