import { SvgIconProps } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface props {
  text: string;
  to?: string;
  icon?: React.ReactElement<SvgIconProps>;
  onClick?: () => void;
}

const NavbarButton = ({ text, to, icon, onClick }: props) => {
  const OnClick = ({ children }: any) => {
    return (
      <>
        {onClick ? (
          <button className="m-0 h-full w-full p-0" onClick={onClick}>
            {children}
          </button>
        ) : (
          children
        )}
      </>
    );
  };

  const To = ({ children }: any) => {
    return (
      <>
        {to ? (
          <Link className="m-0 h-full w-full p-0" to={to}>
            {children}
          </Link>
        ) : (
          children
        )}
      </>
    );
  };

  return (
    <div className="m-2">
      <To>
        <OnClick>
          <div className="flex cursor-pointer flex-row rounded p-2 text-sm font-semibold text-neutral-400 hover:bg-neutral-700">
            <div className="">{icon ? icon : text[0]}</div>

            <div className="ml-2">{text}</div>
          </div>
        </OnClick>
      </To>
    </div>
  );
};

export default NavbarButton;
