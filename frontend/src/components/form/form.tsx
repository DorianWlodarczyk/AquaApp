import React from "react";
import InputText from "../input-text/input-text";
import ImgPicker from "../img-picker/img-picker";

interface props {
  inputs?: inputConfig[];
  className?: string;
  onChange?: (value: inputData[]) => void;
  values: inputData[];
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
  name: string;
}

export const getInitState = (inputs: inputConfig[]): inputData[] => {
  const states: inputData[] = [];

  for (let item of inputs) {
    if (item.type !== "LABEL") {
      states.push({
        value: "",
        error: false,
        name: `${item.name}`,
      });
    }
  }

  return states;
};

const Form = ({ inputs, className, values, onChange }: props) => {
  const renderTextInput = (
    input: inputConfig,
    index: number,
    value: inputData
  ) => {
    console.log(value.value);
    return (
      <div className={`${input.className}`} key={index}>
        <InputText
          label={input.label}
          helperText={input.helperText}
          clearIcon={true}
          value={value.value}
          onChange={(value) => onChangeHandler(input.name!, value)}
        />
      </div>
    );
  };

  const renderImgPicker = (
    input: inputConfig,
    index: number,
    value: inputData
  ) => {
    return (
      <div className={`${input.className}`} key={index}>
        <ImgPicker onClick={(value) => onChangeHandler(input.name!, value)} />
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
    return inputs?.map((item, index) => {
      const input = values.find((element) => item.name === element.name);
      switch (item.type) {
        case "TEXT":
          return renderTextInput(item, index, input!);

        case "IMG":
          return renderImgPicker(item, index, input!);

        case "LABEL":
          return renderLabel(item, index);
      }

      return <></>;
    });
  };

  const onChangeHandler = (name: string, value: string) => {
    const newValues = [...values];

    for (let item of newValues) {
      if (item.name === name) {
        item.value = value;
        break;
      }
    }
    if (onChange) onChange(newValues);
  };

  return (
    <div className={`grid w-full  gap-x-5 gap-y-[50px] ${className}`}>
      {renderInputs()}
    </div>
  );
};

export default Form;
