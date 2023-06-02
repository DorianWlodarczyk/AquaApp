import React from "react";
import { inputData } from "../../../../../utils/models/input-data";
import InputText from "../../../../../components/input-text/input-text";
import AquariumPreview from "../components/aquarium-preview/aquarium-preview";

interface props {
  onChange: (value: string, name: string) => void;
  values: inputData[];
}

const Step2 = ({ onChange, values }: props) => {
  return (
    <div className="mt-5 flex w-full flex-col items-center justify-around lg:flex-row">
      <div className="flex min-h-[300px] w-[200px] flex-col items-center justify-center">
        <div className="mb-[100px] mt-3 w-full text-center text-xl">
          Podgląd
        </div>
        <AquariumPreview values={values} />
      </div>
      <div className="flex flex-col">
        <div className="mb-3 w-full text-center text-xl">
          Podaj wymiary akwarium
        </div>
        <div className="mt-3 flex h-full flex-col items-center gap-10">
          <InputText
            label="Długość"
            helperText="wartość w [cm]"
            onChange={(value) => onChange(value, "length")}
            error={values.find((item) => item.name === "length")?.error}
            value={values.find((item) => item.name === "length")?.value || ""}
          />
          <InputText
            label="Szerokość"
            helperText="wartość w [cm]"
            onChange={(value) => onChange(value, "width")}
            error={values.find((item) => item.name === "width")?.error}
            value={values.find((item) => item.name === "width")?.value || ""}
          />
          <InputText
            label="Wysokość"
            helperText="wartość w [cm]"
            onChange={(value) => onChange(value, "height")}
            error={values.find((item) => item.name === "height")?.error}
            value={values.find((item) => item.name === "height")?.value || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
