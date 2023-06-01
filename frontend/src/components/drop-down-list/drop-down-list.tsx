import React, { useEffect, useState } from "react";
// import style from "./drop-down-list.module.css";
import InputText from "../input-text/input-text";

interface props {
  options?: DropDownOption[];
  className?: string;
  label?: string;
  value?: string;
  error?: boolean;
  onChange?: (value: string) => void;
}

export interface DropDownOption {
  name: string;
  value: string;
}

const DropDownList = ({
  options,
  className,
  label,
  value,
  error,
  onChange,
}: props) => {
  const [optionsList, setOptionsList] = useState<DropDownOption[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [localError, setLocalError] = useState(false);
  const renderOptionsList = () => {
    return optionsList?.map((item, index) => {
      return (
        <div
          key={index}
          className="flex h-[40px] cursor-pointer items-center bg-white pl-2 even:bg-neutral-50 hover:bg-neutral-100"
          onClick={() => onClickHandler(item)}
        >
          {item.name}
        </div>
      );
    });
  };

  const onClickHandler = (value: DropDownOption) => {
    console.log(
      "🚀 ~ file: drop-down-list.tsx:50 ~ onClickHandler ~ value.name:",
      value.name
    );
    setText(value.name);
    if (onChange) onChange(value.value);
  };

  const onBlurHandler = () => {
    if (optionsList.length > 0 && text !== "") {
      setText(optionsList[0].name);

      if (onChange) onChange(optionsList[0].value);
    }

    setTimeout(() => setOpen(false), 100);
  };

  useEffect(() => {
    setLocalError(false);
    if (text === "") {
      setOptionsList(options || []);
      return;
    }
    const newList = options?.filter((item) => {
      if (item.name.toUpperCase().includes(text.toUpperCase().trim())) {
        return true;
      }

      return false;
    });

    setOptionsList(newList || []);

    if (newList?.length === 0) {
      setLocalError(true);
    }
  }, [options, text]);

  useEffect(() => {
    setOptionsList(options || []);
  }, [options]);

  return (
    <div>
      <InputText
        label={label}
        onFocus={() => setOpen(true)}
        onBlur={onBlurHandler}
        onChange={(value) => setText(value)}
        value={text}
        clearIcon
        error={localError}
      />

      {isOpen && (
        <div className="absolute box-border max-h-[200px] w-full overflow-y-auto border-2">
          {renderOptionsList()}
        </div>
      )}
    </div>
  );
};

export default DropDownList;
