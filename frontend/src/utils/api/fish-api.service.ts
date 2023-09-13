import { ConflictsData } from "../models/fish/conflicts-data";
import { FishData, FishListData } from "../models/fish/fish-data";
import { SpeciesData } from "../models/fish/species-data";
import ApiService from "./api.service";

class FishApi extends ApiService {
  static async getConflicts(): Promise<ConflictsData[]> {
    try {
      const response = await ApiService.get<ConflictsData[]>(
        "aqua/fish/fish_conflict"
      );
      if (response) {
        return response;
      }
    } catch (e) {
      return [];
    }

    return [];
  }

  static async getFishSpeciesFromAquarium(aquaID: string): Promise<string[]> {
    try {
      const response = await ApiService.get<string[]>(`aqua/${aquaID}/species`);
      if (response) {
        return response;
      }
    } catch (e) {
      return [];
    }

    return [];
  }

  static async getSpecies(): Promise<SpeciesData[]> {
    try {
      const response = await ApiService.get<SpeciesData[]>(
        "aqua/fishes/all_species"
      );
      if (response) {
        return response;
      }
    } catch (e) {
      return [];
    }

    return [];
  }

  static async getAquariumsWithFish(): Promise<FishListData[]> {
    try {
      const response = await ApiService.get<FishListData[]>(
        "aqua/aquariums-and-fish"
      );
      if (response) {
        console.log(
          "🚀 ~ file: fish-api.service.ts:60 ~ FishApi ~ getAquariumsWithFish ~ response:",
          response
        );
        return response;
      }
    } catch (e) {
      return [];
    }

    return [];
  }
}

export default FishApi;
