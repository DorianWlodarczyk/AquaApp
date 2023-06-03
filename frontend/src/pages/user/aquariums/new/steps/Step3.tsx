import React from "react";
import { inputData } from "../../../../../utils/models/input-data";
import DropDownList, {
  DropDownOption,
} from "../../../../../components/drop-down-list/drop-down-list";
interface props {
  onChange: (value: string, name: string) => void;
  values: inputData[];
}

const temp: DropDownOption[] = [
  { name: "A Option1", value: "Option1" },
  { name: "B Option2", value: "Option2" },
  { name: "C Option3", value: "Option3" },
  { name: "AA Option4", value: "Option4" },
  { name: "AB Option5", value: "Option5" },
  { name: "AC Option6", value: "Option6" },
  { name: "CA Option7", value: "Option7" },
  { name: "CB Option8", value: "Option8" },
  { name: "CC Option9", value: "Option9" },
  { name: "AAA Option10", value: "Option10" },
];

const Step3 = ({ onChange, values }: props) => {
  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="flex w-11/12 flex-col items-center justify-around gap-16 lg:w-9/12 lg:flex-row">
        <DropDownList
          options={temp}
          label="Grzałka"
          onChange={(value) => onChange(value, "heater")}
          value={values.find((item) => item.name === "heater")?.value || ""}
        />

        <DropDownList
          options={temp}
          label="Pompa"
          onChange={(value) => onChange(value, "pump")}
          value={values.find((item) => item.name === "pump")?.value || ""}
        />
        <DropDownList
          options={temp}
          label="Oświetlenie"
          onChange={(value) => onChange(value, "lamp")}
          value={values.find((item) => item.name === "lamp")?.value || ""}
        />
      </div>
    </div>
  );
};

export default Step3;
