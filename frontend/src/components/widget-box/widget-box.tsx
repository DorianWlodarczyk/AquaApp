import React from "react";
import IconBox from "./icon-box/icon-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
interface props {
  children: React.ReactNode;
  title?: string;
}

const WidgetBox = ({ children, title }: props) => {
  return (
    <div className="relative w-full rounded bg-white pb-3 shadow">
      <div className="absolute left-[30px] top-[-20px]">
        <IconBox color="GREEN" icon={<QueuePlayNextIcon />} />
      </div>
      <div className="absolute left-[100px] top-3 text-xl">{title}</div>
      <div className="w-full pt-[50px]">{children}</div>
    </div>
  );
};

export default WidgetBox;
