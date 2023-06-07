import React, { useEffect, useRef, useState } from "react";

interface props {
  options?: CheckboxOption[];
  values?: CheckboxData[];
  onChange?: (value: CheckboxData[]) => void;
  title?: string;
}

export interface CheckboxOption {
  name: string;
  id: string;
}

export interface CheckboxData {
  id: string;
  value: boolean;
}

const CheckboxList = ({ options, values, onChange, title = "list" }: props) => {
  const [checkboxValue, setCheckboxValue] = useState<CheckboxData[]>([]);
  const [isOpen, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const onChangeHandler = (id: string) => {
    const newValues = [...checkboxValue];
    for (let item of newValues) {
      if (item.id === id) {
        item.value = !item.value;
        break;
      }
    }

    setCheckboxValue(newValues);

    if (onChange) onChange(newValues);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", (e) => {
        handleClickOutside(e);
      });
    }

    return () => {
      document.removeEventListener("click", () => {});
    };
  }, [isOpen]);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(!isOpen);
  };

  const renderCheckboxList = () => {
    return (
      <>
        <div
          ref={boxRef}
          className="absolute left-1/2 top-[40px] z-20 max-h-[200px] min-w-[200px] -translate-x-1/2 overflow-y-auto rounded border-2 border-solid bg-neutral-50"
        >
          {options?.map((item, index) => {
            return (
              <div
                key={index}
                className="z-30 flex cursor-pointer flex-row justify-between py-2 pl-3 hover:bg-neutral-200"
              >
                <div className="select-none text-left text-base text-neutral-500">
                  {item.name.length < 32
                    ? item.name
                    : `${item.name.slice(0, 32)}...`}
                </div>

                <div className="mr-2 flex w-10 flex-row items-center justify-center">
                  <input
                    className="h-5 w-5 cursor-pointer"
                    type="checkbox"
                    checked={
                      checkboxValue.find((val) => val.id === item.id)?.value ??
                      false
                    }
                    onChange={() => onChangeHandler(item.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  useEffect(() => {
    if (values) setCheckboxValue(values);
  }, [values]);

  return (
    <div>
      <button onClick={handleButtonClick}>{title}</button>
      {isOpen ? renderCheckboxList() : <></>}
    </div>
  );
};

export default CheckboxList;