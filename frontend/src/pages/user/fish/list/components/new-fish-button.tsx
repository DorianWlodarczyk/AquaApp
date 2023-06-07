import React from "react";
import { Link } from "react-router-dom";

interface props {
  aquariumID?: string;
}

const NewFishButton = ({ aquariumID = "" }: props) => {
  return (
    <Link to={`/aqua/${aquariumID}/fish/new`}>
      <div className="group flex h-[130px] cursor-pointer select-none flex-row items-center justify-center rounded-3xl border-[4px] border-dashed border-neutral-400 hover:border-neutral-500">
        <div className="font-bold text-neutral-400 group-hover:text-neutral-500">
          Dodaj nową rybę
        </div>
      </div>
    </Link>
  );
};

export default NewFishButton;
