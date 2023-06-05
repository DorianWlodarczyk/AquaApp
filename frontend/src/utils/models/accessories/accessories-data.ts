import { AssetData } from "./asset-data";
import { GroundData } from "./ground-data";
import { HeaterData } from "./heater-data";
import { LampData } from "./lamp-data";
import { PlantData } from "./plant-data";
import { PumpData } from "./pump-data";

interface AccessoriesData {
  heaters: HeaterData[];
  lamps: LampData[];
  pumps: PumpData[];
  assets: AssetData[];
  plants: PlantData[];
  grounds: GroundData[];
}

export type {
  HeaterData,
  LampData,
  PumpData,
  AssetData,
  PlantData,
  GroundData,
};

export default AccessoriesData;
