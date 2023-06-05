import React, { useEffect, useState } from "react";
import { inputData } from "../../../../../utils/models/input-data";
import DropDownList, {
  DropDownOption,
} from "../../../../../components/drop-down-list/drop-down-list";
import AccessoriesData from "../../../../../utils/models/accessories/accessories-data";
import ReportIcon from "@mui/icons-material/Report";
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
    const maxVolume =
      accessories.heaters.find((item) => item.id === id)?.maxCapacity || -1;

    if (maxVolume < volume && maxVolume !== -1) {
      return (
        <div className="my-5 rounded-2xl border-4 border-solid border-red-500 bg-red-50 px-5 py-2 font-semibold text-red-700">
          <div className="w-full text-center">
            <ReportIcon className="" style={{ fontSize: "50px" }} />
          </div>
          <div>
            Wybrana przez Ciebie grzałka jest przeznaczona do mniejszego
            akwarium (do {maxVolume}L). Sugerujemy wybór mocniejszej grzałki
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const showPumpHint = () => {
    const id = values.find((item) => item.name === "pump")?.value;
    const maxVolume =
      accessories.pumps.find((item) => item.id === id)?.maxCapacity || -1;

    if (maxVolume < volume && maxVolume !== -1) {
      return (
        <div className="my-5 inline-block rounded-2xl border-4 border-solid border-red-500 bg-red-50 px-5 py-2 font-semibold text-red-700">
          <div className="w-full text-center">
            <ReportIcon className="" style={{ fontSize: "50px" }} />
          </div>
          <div>
            Wybrana przez Ciebie pompa jest przeznaczona do mniejszego akwarium
            ({maxVolume}L). Sugerujemy wybór wydajniejszej pompy
          </div>
        </div>
      );
    } else {
      return <></>;
    }
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
      <div className="flex w-11/12 max-w-[1200px] flex-col justify-around gap-16 xl:flex-row">
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
            options={pumps}
            label="Pompa"
            sort
            onChange={(value) => onChange(value, "pump")}
            value={values.find((item) => item.name === "pump")?.value || ""}
          />
          {showPumpHint()}
        </div>

        <div className="w-full">
          <DropDownList
            options={lamps}
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
