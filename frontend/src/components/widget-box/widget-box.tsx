import React from "react";
import IconBox from "./icon-box/icon-box";
import { SvgIconProps } from "@mui/material";
interface props {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactElement<SvgIconProps>;
}

const WidgetBox = ({ children, title, icon }: props) => {
  return (
    <div className="relative w-full rounded bg-white pb-3 shadow">
      <div className="absolute left-[30px] top-[-20px]">
        {icon && <IconBox color="GREEN" icon={icon} />}
      </div>
      <div className="absolute left-[100px] top-3 text-xl">{title}</div>
      <div className="w-full pt-[50px]">{children}</div>
    </div>
  );
};

export default WidgetBox;
