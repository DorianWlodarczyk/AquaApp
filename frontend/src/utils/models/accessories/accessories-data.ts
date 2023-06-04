import { HeaterData } from "./heater-data";
import { LampData } from "./lamp-data";
import { PumpData } from "./pump-data";

interface AccessoriesData {
  heaters: HeaterData[];
  lamps: LampData[];
  pumps: PumpData[];
}

export type { HeaterData, LampData, PumpData };

export default AccessoriesData;
