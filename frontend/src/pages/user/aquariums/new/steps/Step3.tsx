import React, { useEffect, useState } from "react";
import { inputData } from "../../../../../utils/models/input-data";
import DropDownList, {
  DropDownOption,
} from "../../../../../components/drop-down-list/drop-down-list";
import AccessoriesData from "../../../../../utils/models/accessories/accessories-data";
interface props {
  onChange: (value: string, name: string) => void;
  values: inputData[];
  accessories: AccessoriesData;
  volume: number;
}

const Step3 = ({ onChange, values, accessories, volume }: props) => {
  const [heaters, setHeaters] = useState<DropDownOption[]>([]);
  const [lamps, setLamps] = useState<DropDownOption[]>([]);
  const [pumps, setPumps] = useState<DropDownOption[]>([]);

  const showHeatersHint = () => {
    const id = values.find((item) => item.name === "heater")?.value;
    const maxVolume = accessories.heaters.find(
      (item) => item.id === id
    )?.maxCapacity;

    console.log(id, maxVolume, volume);
    // if()
    return <>{values.find((item) => item.name === "heater")?.value}</>;
  };

  useEffect(() => {
    setHeaters(
      accessories.heaters.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      })
    );

    setLamps(
      accessories.lamps.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      })
    );

    setPumps(
      accessories.pumps.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      })
    );
  }, [accessories]);

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="flex w-11/12 flex-col items-center justify-around gap-16 lg:w-9/12 lg:flex-row">
        <div className="w-full">
          <DropDownList
            options={heaters}
            sort
            label="Grzałka"
            onChange={(value) => onChange(value, "heater")}
            value={values.find((item) => item.name === "heater")?.value || ""}
          />
          {showHeatersHint()}
        </div>

        <div className="w-full">
          <DropDownList
            options={lamps}
            label="Pompa"
            sort
            onChange={(value) => onChange(value, "pump")}
            value={values.find((item) => item.name === "pump")?.value || ""}
          />
        </div>

        <div className="w-full">
          <DropDownList
            options={pumps}
            label="Oświetlenie"
            sort
            onChange={(value) => onChange(value, "lamp")}
            value={values.find((item) => item.name === "lamp")?.value || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
