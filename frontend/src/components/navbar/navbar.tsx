import React, { useContext } from "react";
import { UIContext } from "../../contexts/ui-context";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "./user-menu/user-menu";

const Navbar = () => {
  const uiContext = useContext(UIContext);

  return (
    <div className="relative z-50 flex h-[50px] w-full flex-row items-center justify-between bg-neutral-800 drop-shadow lg:bg-white">
      <div>
        <button
          className="ml-5 lg:hidden"
          onClick={() => uiContext.setOpen(!uiContext.isOpen)}
        >
          <MenuIcon
            className="text-white lg:text-slate-800"
            style={{
              fontSize: "28px",
            }}
          />
        </button>
      </div>

      <div className="text-xl text-white lg:hidden">AquaFriends</div>

      <div className="h-full">
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
