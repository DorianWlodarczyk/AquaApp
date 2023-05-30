import React from "react";
import InputText from "../input-text/input-text";
import ImgPicker from "../img-picker/img-picker";

interface props {
  inputs?: inputConfig[];
  className?: string;
  onChange?: (value: inputData[]) => void;
}

export interface inputConfig {
  label?: string;
  name?: string;
  helperText?: string;
  pattern?: RegExp;
  type?: "TEXT" | "DROPDOWN" | "IMG" | "LABEL";
  clearIcon?: boolean;
  className?: string;
}

export interface inputData {
  value: string;
  error: boolean;
  name?: string;
}

const Form = ({ inputs, className }: props) => {
  const renderTextInput = (input: inputConfig, index: number) => {
    return (
      <div className={`${input.className}`} key={index}>
        <InputText
          label={input.label}
          helperText={input.helperText}
          clearIcon={true}
        />
      </div>
    );
  };

  const renderImgPicker = (input: inputConfig, index: number) => {
    return (
      <div className={`${input.className}`} key={index}>
        <ImgPicker onClick={(value) => console.log("Img picker => ", value)} />
      </div>
    );
  };

  const renderLabel = (input: inputConfig, index: number) => {
    return (
      <div
        className={`flex h-full items-center justify-center text-center text-xl ${
          input.className ? input.className : ""
        }`}
        key={index}
      >
        {input.label}
      </div>
    );
  };

  const renderInputs = () => {
    if (inputs?.length === 0) return <></>;

    return inputs?.map((item, index) => {
      switch (item.type) {
        case "TEXT":
          return renderTextInput(item, index);

        case "IMG":
          return renderImgPicker(item, index);

        case "LABEL":
          return renderLabel(item, index);
      }

      return <></>;
    });
  };

  return (
    <div className={`grid w-full  gap-x-5 gap-y-[50px] ${className}`}>
      {renderInputs()}
    </div>
  );
};

export default Form;
