import React from "react";
import IconBox from "./icon-box/icon-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
interface props {
  children: React.ReactNode;
}

const WidgetBox = ({ children }: props) => {
  return (
    <div className="relative min-h-[200px] w-full rounded bg-white shadow">
      <div className="absolute left-[30px] top-[-20px]">
        <IconBox color="GREEN" icon={<QueuePlayNextIcon />} />
      </div>
      {children}
    </div>
  );
};

export default WidgetBox;
