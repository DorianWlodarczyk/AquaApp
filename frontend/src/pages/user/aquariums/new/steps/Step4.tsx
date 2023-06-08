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

const Step4 = ({ onChange, values, accessories }: props) => {
  const [assets, setAssets] = useState<DropDownOption[]>([]);
  const [plants, setPlants] = useState<DropDownOption[]>([]);
  const [grounds, setGrounds] = useState<DropDownOption[]>([]);

  useEffect(() => {
    setAssets(
      accessories.assets.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      })
    );

    setPlants(
      accessories.plants.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      })
    );

    setGrounds(
      accessories.grounds.map((item) => {
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
            options={assets}
            sort
            label="Dodatki"
            onChange={(value) => onChange(value, "asset")}
            value={values.find((item) => item.name === "asset")?.value || ""}
          />
        </div>

        <div className="w-full">
          <DropDownList
            options={plants}
            label="Rośliny"
            sort
            onChange={(value) => onChange(value, "plant")}
            value={values.find((item) => item.name === "plant")?.value || ""}
          />
        </div>

        <div className="w-full">
          <DropDownList
            options={grounds}
            label="Podłoże"
            sort
            onChange={(value) => onChange(value, "ground")}
            value={values.find((item) => item.name === "ground")?.value || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
