import React from "react";
import getAquariumImg from "../../../../../utils/images/aquarium-image";
import ReportSharpIcon from "@mui/icons-material/ReportSharp";
import { Link } from "react-router-dom";
interface props {
  name: string;
  species: string;
  aquaImg: string;
}

const FishButton = ({ name, species, aquaImg }: props) => {
  return (
    <div className="relative">
      <div className="absolute right-5 top-2 z-10 h-[25px] w-[25px]">
        <ReportSharpIcon
          style={{
            width: "35px",
            height: "35px",
            color: "#ff9900",
          }}
        />
      </div>
      <Link to="">
        <div className="group relative h-[135px] cursor-pointer overflow-hidden rounded bg-white shadow duration-500 hover:bg-neutral-50">
          <img
            className="absolute bottom-[-80px] right-[-50px] z-0 h-[250px] w-[250px] select-none opacity-[0.15] duration-500 group-hover:opacity-[0.3]"
            src={getAquariumImg(aquaImg)}
            alt="aqua"
          />

          <div className="absolute flex h-[135px] w-full flex-row items-center justify-around">
            <div className="w-full">
              <div className="text-md text-center font-semibold">Nazwa:</div>
              <div className="overflow-hidden text-ellipsis text-center text-2xl">
                {name.length >= 32 ? `${name.slice(0, 32).trim()}...` : name}
              </div>
            </div>

            <div className="w-full">
              <div className="text-md text-center font-semibold">Gatunek:</div>
              <div className="text-center text-2xl">
                {species.length >= 32
                  ? `${species.slice(0, 32).trim()}...`
                  : species}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FishButton;
