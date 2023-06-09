import React from "react";
import getAquariumImg from "../../../../../utils/images/aquarium-image";
import ReportSharpIcon from "@mui/icons-material/ReportSharp";
import { Link } from "react-router-dom";
import { SpeciesData } from "../../../../../utils/models/fish/species-data";
interface props {
  name: string;
  species: string;
  speciesList: SpeciesData[];
  conflicts: string[];
  aquaImg: string;
  fishID: string;
}

const FishButton = ({
  name,
  species,
  aquaImg,
  fishID,
  speciesList,
  conflicts,
}: props) => {
  return (
    <div className="relative">
      {conflicts.length > 0 && (
        <div className="group absolute right-5 top-2 z-10 h-[25px] w-[25px]">
          <ReportSharpIcon
            style={{
              width: "35px",
              height: "35px",
              color: "#ff9900",
            }}
          />
          <div className="absolute right-[-15px] hidden w-[200px] rounded-md border-2 border-neutral-400 bg-neutral-50 p-2 shadow-xl group-hover:block">
            <div className="text-lg font-semibold">Konflikt z gatunkami:</div>
            <ul className="ml-[25px] list-disc">
              {conflicts.map((item) => {
                return (
                  <li>
                    {speciesList.find((element) => element.id === item)?.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <Link to={fishID}>
        <div className="group relative h-[135px] cursor-pointer overflow-hidden rounded bg-white shadow duration-500 hover:bg-neutral-50">
          <img
            className="absolute bottom-[-80px] right-[-50px] z-0 h-[250px] w-[250px] select-none opacity-[0.15] duration-500 
            group-hover:h-[275px] group-hover:w-[275px] group-hover:opacity-[0.3]"
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
