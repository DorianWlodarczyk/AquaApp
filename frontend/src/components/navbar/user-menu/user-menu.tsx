import React, { FocusEvent, useState } from "react";
import NavbarButton from "../navbar-button/navbar-button";

const UserMenu = () => {
  const [isOpen, setOpen] = useState(false);

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTimeout(() => setOpen(false), 100);
  };

  return (
    <>
      <div
        className="mr-3 flex h-full cursor-pointer items-center"
        onBlur={onBlur}
      >
        <div className="flex h-[43px] w-[43px] items-center justify-center rounded-full hover:bg-neutral-200">
          <button
            onClick={() => setOpen(!isOpen)}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full text-lg font-bold text-white"
            style={{
              background:
                "linear-gradient(131deg, rgba(74, 108, 243, 1) 0%, rgba(57, 188, 245, 1) 21%, rgba(118, 91, 219, 1) 79%, rgba(74, 108, 243, 1) 100%)",
            }}
          >
            R
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-[15px] top-[60px] min-w-[150px] rounded-lg bg-neutral-800">
          <NavbarButton text="Konto" to="account" />

          <NavbarButton text="Wyloguj" onClick={() => console.log("Wyloguj")} />
        </div>
      )}
    </>
  );
};

export default UserMenu;
