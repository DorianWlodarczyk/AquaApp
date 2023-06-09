import { SvgIconProps } from "@mui/material";
import React from "react";

interface props {
  text?: string;
  onClick?: () => void;
  icon?: React.ReactElement<SvgIconProps>;
  enabled?: boolean;
}

const Button = ({ text, onClick, icon, enabled = true }: props) => {
  const onClickHandler = () => {
    if (enabled) {
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <button
      className={`min-w-[100px] rounded-lg  p-3 text-base font-semibold text-white duration-200  ${
        enabled
          ? "bg-blue-500 hover:bg-blue-600"
          : "cursor-default bg-neutral-500 text-neutral-100"
      }`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
