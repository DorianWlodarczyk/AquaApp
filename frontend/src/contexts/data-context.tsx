import React, { useState } from "react";
import { HeaterData } from "../utils/models/heater-data";
import { PumpData } from "../utils/models/pump-data";
import { LampData } from "../utils/models/lamp-data";

interface props {
  children: React.ReactNode;
}

interface DataContextState {
  heaters: HeaterData[];
  setHeaters: (heaters: HeaterData[]) => void;

  pumps: PumpData[];
  setPumps: (pumps: PumpData[]) => void;

  lamps: LampData[];
  setLamps: (lamps: LampData[]) => void;
}

export const DataContext = React.createContext<DataContextState>({
  heaters: [],
  setHeaters: (heaters: HeaterData[]) => {},

  pumps: [],
  setPumps: (pumps: PumpData[]) => {},

  lamps: [],
  setLamps: (lamps: LampData[]) => {},
});

export const DataContextProvider = ({ children }: props) => {
  const setHeaters = (heaters: HeaterData[]) => {
    setState({ ...state, heaters: heaters });
  };

  const setPumps = (pumps: PumpData[]) => {
    setState({ ...state, pumps: pumps });
  };

  const setLamps = (lamps: LampData[]) => {
    setState({ ...state, lamps: lamps });
  };

  const initState: DataContextState = {
    heaters: [],
    setHeaters: setHeaters,

    pumps: [],
    setPumps: setPumps,

    lamps: [],
    setLamps: setLamps,
  };

  const [state, setState] = useState(initState);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
