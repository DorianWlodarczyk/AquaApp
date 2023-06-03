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

  const onClickHandler = (newValue: DropDownOption) => {
    setText(newValue.name);
    setOpen(false);
    if (onChange) onChange(newValue.name);
  };

  const onBlurHandler = () => {
    if (optionsList.length > 0 && text !== "") {
      setText(optionsList[0].name);

      if (onChange) onChange(optionsList[0].value);
    } else {
      setText(value ?? "");
      if (onChange) onChange("");
    }

    setTimeout(() => setOpen(false), 100);
  };

  const onChangeHandler = (value: string) => {
    setText(value);
    if (onChange) onChange(value);
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

  useEffect(() => {
    if (value) setText(value);
  }, [value]);

  return (
    <div className="relative w-full">
      <InputText
        label={label}
        onFocus={() => setOpen(true)}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        value={text}
        clearIcon
        error={localError}
      />

      {isOpen && (
        <div className="absolute z-10 box-border max-h-[200px] w-full overflow-y-auto border-2">
          {renderOptionsList()}
        </div>
      )}
    </div>
  );
};

export default DropDownList;
