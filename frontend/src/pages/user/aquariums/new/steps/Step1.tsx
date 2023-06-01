import React from "react";
import ImgPicker from "../../../../../components/img-picker/img-picker";
import InputText from "../../../../../components/input-text/input-text";
import { inputData } from "../new-aquarium-page";

interface props {
  onChange: (value: string, name: string) => void;
  values: inputData[];
}

const Step1 = ({ onChange, values }: props) => {
  return (
    <div className="mt-5 flex justify-around">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-3 w-full text-center text-xl">Wybierz grafikę</div>
        <ImgPicker
          onClick={(value) => onChange(value, "imgID")}
          value={values.find((item) => item.name === "imgID")?.value || ""}
        />
      </div>
      <div className="flex flex-col">
        <div className="mb-3 w-full text-center text-xl">
          Nadaj nazwę swojemu akwarium
        </div>
        <div className="flex h-full items-center">
          <InputText
            label="Nazwa akwarium"
            helperText="Max 32 znaki"
            onChange={(value) => onChange(value, "name")}
            value={values.find((item) => item.name === "name")?.value || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;