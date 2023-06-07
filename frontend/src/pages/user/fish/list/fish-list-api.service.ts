import ApiService from "../../../../utils/api/api.service";
import {
  FishData,
  FishListData,
} from "../../../../utils/models/fish/fish-data";
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

  static async getFishList(): Promise<FishListData[]> {
    await new Promise((r) => setTimeout(r, 100));

    const mockName = [
      "Andrzej",
      "Karolina",
      "Zenek",
      "Alfred",
      "Ola",
      "Kamila",
      "Natalia",
      "Julia",
      "Adolf",
    ];

    const output: FishListData[] = [];

    for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
      const fishList: FishData[] = [];

      for (let j = 0; j < Math.floor(Math.random() * 10 + 2); j++) {
        fishList.push({
          name: `${mockName[Math.floor(Math.random() * mockName.length)]}`,
          id: `${j}`,
          speciesID: `${Math.floor(Math.random() * 5)}`,
        });
      }

      output.push({
        aquariumName: `Akwarium ${i}`,
        aquariumID: `${i}`,
        fish: fishList,
        aquariumImg: `${Math.floor(Math.random() * 10)}`,
      });
    }

    return output;
  }
}

export default FishListApi;
