import { SvgIconProps } from "@mui/material";
import React from "react";
import style from "./icon-box.module.css";

export enum Color {
  GREEN,
  BLUE,
  RED,
  ORANGE,
  PURPLE,
}

interface props {
  color?: Color;
  icon?: React.ReactElement<SvgIconProps>;
}

const IconBox = ({ color, icon }: props) => {
  const getColor = (): string => {
    switch (color) {
      case Color.GREEN:
        return style.green;

      case Color.BLUE:
        return style.blue;

      case Color.RED:
        return style.red;

      case Color.ORANGE:
        return style.orange;

      case Color.PURPLE:
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
