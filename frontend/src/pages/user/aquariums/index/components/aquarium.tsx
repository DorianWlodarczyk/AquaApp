import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import getAquariumImg from "../../../../../utils/images/aquarium-image";
import { getRandomFishIcon } from "../../../../../utils/images/fish-icon";

interface props {
  id: string;
  name: string;
  fishNumber: number;
  imgID: string;
}

const Aquarium = ({ name, id, fishNumber, imgID }: props) => {
  return (
    <div className="group flex cursor-pointer flex-row rounded bg-white shadow hover:bg-neutral-50">
      <div className="flex h-full items-center">
        <div className="my-4 ml-5 h-[65px] w-[65px] sm:h-[75px] sm:w-[75px] md:h-[100px] md:w-[100px]">
          <img src={getAquariumImg(imgID)} alt="" />
        </div>
      </div>
      <div className="my-4 ml-3 w-full">
        <div className="w-full text-center text-xl font-normal">
          <div className="px-3">{name}</div>
        </div>

        <div className="mt-5 flex w-full flex-row justify-around">
          <div className="flex text-2xl">
            <div className="flex items-center pr-2 text-xl font-medium text-neutral-500">
              {`${fishNumber}x`}
            </div>
            <div className="ml-1 flex w-[35px] items-center">
              <img src={getRandomFishIcon()} alt="" />
            </div>
          </div>

          <button className="h-[50px] w-[50px] rounded-full bg-sky-300 duration-200 group-hover:bg-sky-500">
            <div>
              <NavigateNextIcon style={{ color: "white", fontSize: "28px" }} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aquarium;
