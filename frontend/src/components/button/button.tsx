import { SvgIconProps } from "@mui/material";
import React from "react";

interface props {
  text?: string;
  onClick?: () => void;
  icon?: React.ReactElement<SvgIconProps>;
}

const Button = ({ text, onClick, icon }: props) => {
  return (
    <button className="rounded-lg bg-blue-500 p-3 text-base font-semibold text-white">
      {text}
    </button>
  );
};

export default Button;
