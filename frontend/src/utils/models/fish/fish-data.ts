export interface FishListData {
  aquariumName: string;
  aquariumImg: string;
  aquariumID: string;
  fish: FishData[];
}

export interface FishData {
  id: string;
  name: string;
  speciesID: string;
}
