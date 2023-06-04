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
}

const Step3 = ({ onChange, values, accessories }: props) => {
  const [heaters, setHeaters] = useState<DropDownOption[]>([]);
  const [lamps, setLamps] = useState<DropDownOption[]>([]);
  const [pumps, setPumps] = useState<DropDownOption[]>([]);

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
        <DropDownList
          options={heaters}
          sort
          label="Grzałka"
          onChange={(value) => onChange(value, "heater")}
          value={values.find((item) => item.name === "heater")?.value || ""}
        />

        <DropDownList
          options={lamps}
          label="Pompa"
          sort
          onChange={(value) => onChange(value, "pump")}
          value={values.find((item) => item.name === "pump")?.value || ""}
        />
        <DropDownList
          options={pumps}
          label="Oświetlenie"
          sort
          onChange={(value) => onChange(value, "lamp")}
          value={values.find((item) => item.name === "lamp")?.value || ""}
        />
      </div>
    </div>
  );
};

export default Step3;
