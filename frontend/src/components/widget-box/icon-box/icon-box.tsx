import { SvgIconProps } from "@mui/material";
import React from "react";
import style from "./icon-box.module.css";
interface props {
  color?: "GREEN" | "BLUE" | "RED" | "ORANGE" | "PURPLE";
  icon?: React.ReactElement<SvgIconProps>;
}

const IconBox = ({ color, icon }: props) => {
  const getColor = (): string => {
    switch (color) {
      case "GREEN":
        return style.green;

      case "BLUE":
        return style.blue;

      case "RED":
        return style.red;

      case "ORANGE":
        return style.orange;

      case "PURPLE":
        return style.purple;

      default:
        return style.green;
    }
  };
  return (
    <div className={`${style.bgIcon} ${getColor()}`}>
      <div className={style.icon}>{icon}</div>
    </div>
  );
};

export default IconBox;
