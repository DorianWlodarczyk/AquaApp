import React, { useEffect, useState } from "react";
import { aquariumImg } from "../../utils/images/aquarium-image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
interface props {
  previewNumber?: number;
  onClick: (value: string) => void;
  value: string;
}

const ImgPicker = ({ previewNumber = 2, onClick, value }: props) => {
  const [index, setIndex] = useState(0);

  const getPreviewImg = (number: number) => {
    const mapKeys: string[] = Array.from(aquariumImg.keys());
    const output: string[] = [];

    for (let i = -number; i <= number; i++) {
      const key =
        (index - i) % mapKeys.length >= 0
          ? (index - i) % mapKeys.length
          : mapKeys.length - Math.abs((index - i) % mapKeys.length);

      output.push(aquariumImg.get(mapKeys[key]) || "");
    }

    return output;
  };

  const onClickHandler = (value: number) => {
    setIndex(value);
    const mapKeys: string[] = Array.from(aquariumImg.keys());

    const key =
      value % mapKeys.length >= 0
        ? value % mapKeys.length
        : mapKeys.length - Math.abs(value % mapKeys.length);

    onClick(mapKeys[key]);
  };

  useEffect(() => {
    const mapKeys: string[] = Array.from(aquariumImg.keys());
    setIndex(mapKeys.indexOf(value));
  }, [value]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-around">
        <button
          className="group flex w-full items-center justify-center"
          onClick={() => onClickHandler(index + 1)}
        >
          <div className="mr-2 flex h-[60px] w-[30px] items-center justify-center rounded-full text-3xl font-bold text-neutral-600 group-hover:bg-neutral-100">
            <ArrowBackIosNewIcon />
          </div>
        </button>

        <img
          className="h-[200px] w-[200px] select-none"
          src={getPreviewImg(previewNumber)[previewNumber]}
          alt="Aquarium"
        />

        <button
          className="group flex w-full items-center justify-center"
          onClick={() => onClickHandler(index - 1)}
        >
          <div className="ml-2 flex h-[60px] w-[30px] items-center justify-center rounded-full text-3xl font-bold text-neutral-600 group-hover:bg-neutral-100">
            <ArrowForwardIosIcon />
          </div>
        </button>
      </div>

      <div className="mt-3 flex flex-row justify-around">
        {getPreviewImg(previewNumber).map((item, i) => {
          return (
            <img
              className={`h-[50px] w-[50px] cursor-pointer select-none hover:opacity-100 ${
                i !== previewNumber ? "opacity-40" : ""
              }`}
              src={item}
              onClick={() => {
                onClickHandler(index - (i - previewNumber));
              }}
              alt="aquarium"
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImgPicker;
