import React from "react";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";

const PageNotFound = () => {
  return (
    <div className="flex h-5/6 select-none flex-col items-center justify-center text-neutral-400">
      <NotListedLocationIcon
        className=""
        style={{
          fontSize: "192px",
        }}
      />
      <div className="mt-[20px] text-xl">Nie znaleziono strony</div>
    </div>
  );
};

export default PageNotFound;
