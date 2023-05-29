import React from "react";
import Button from "../../../../../components/button/button";

const EmptyAquariumsList = () => {
  return (
    <div className="flex h-5/6 flex-col items-center justify-center text-center text-2xl">
      <div className="text-neutral-800">
        Nie masz jeszcze utworzonych akwariów?
      </div>

      <div className="mt-10">
        <Button text="Utwórz nowe" />
      </div>
    </div>
  );
};

export default EmptyAquariumsList;
