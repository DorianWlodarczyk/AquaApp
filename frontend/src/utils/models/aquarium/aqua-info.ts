import { AquaHistory } from "./aqua-history";

export interface AquaInfo {
  fishNumber: number;
  width: number;
  height: number;
  length: number;
  aquaName: string;
  aquaImg: string;
  heaterName: string;
  lampName: string;
  pumpName: string;
  assetName: string;
  plantName: string;
  groundName: string;
  history: AquaHistory[];
}
