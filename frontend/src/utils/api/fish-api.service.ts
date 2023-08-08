import { ConflictsData } from "../models/fish/conflicts-data";
import { FishData, FishListData } from "../models/fish/fish-data";
import { SpeciesData } from "../models/fish/species-data";
import ApiService from "./api.service";

class FishApi extends ApiService {
  static async getConflicts(): Promise<ConflictsData[]> {
    return [
      {
        speciesID: "0",
        conflicts: ["1", "3", "2"],
      },
      {
        speciesID: "1",
        conflicts: ["0"],
      },
      {
        speciesID: "2",
        conflicts: ["3", "0"],
      },
      {
        speciesID: "3",
        conflicts: ["2", "0"],
      },
    ];
  }

  static async getFishSpeciesFromAquarium(aquaID: string): Promise<string[]> {
    const result = [];

    result.push("0");
    result.push("1");
    result.push("2");
    result.push("3");

    return result;
  }

  static async getSpecies(): Promise<SpeciesData[]> {
    await new Promise((r) => setTimeout(r, 0));

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

  static async getAquariumsWithFish(): Promise<FishListData[]> {
    await new Promise((r) => setTimeout(r, 120));

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
      "Ambroży",
      "Włodzimierz",
      "Wacław",
    ];

    const output: FishListData[] = [];

    for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
      const fishList: FishData[] = [];

      for (let j = 0; j < Math.floor(Math.random() * 20 + 5); j++) {
        const conf = [];

        if (Math.random() < 0.2) {
          conf.push(`${Math.floor(Math.random() * 5)}`);

          if (Math.random() < 0.5) {
            conf.push(`${Math.floor(Math.random() * 5)}`);

            if (Math.random() < 0.5) {
              conf.push(`${Math.floor(Math.random() * 5)}`);
            }
          }
        }

        fishList.push({
          name: `${mockName[Math.floor(Math.random() * mockName.length)]}`,
          id: `${i}-${j}`,
          speciesID: `${Math.floor(Math.random() * 5)}`,
          conflicts: conf,
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

export default FishApi;
