import React, { useState } from "react";
import WidgetBox from "../../../../../components/widget-box/widget-box";
import { Color } from "../../../../../components/widget-box/icon-box/icon-box";
import ReportIcon from "@mui/icons-material/Report";

interface props {
  conflicts: string[];
}

const renderTextWithBold = (text: string) => {
  const boldRegex = /(\*\*.*?\*\*)/g;
  const parts = text.split(boldRegex);
  return (
    <>
      {parts.map((part, index) =>
        part.match(boldRegex) ? (
          <span className="whitespace-pre font-bold" key={index}>
            {part.replace(/\*\*/g, " ")}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

const ConflictBox = ({ conflicts }: props) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <WidgetBox
      color={Color.RED}
      icon={<ReportIcon />}
      title="Uwagi"
      className="mt-8"
    >
      <div className="overflow-auto pt-5">
        {conflicts.slice(0, !isOpen ? 3 : 9999).map((item, index) => {
          return (
            <div
              key={index}
              className="flex h-[50px] w-full items-center whitespace-nowrap bg-slate-100 pl-5 even:bg-white"
            >
              {renderTextWithBold(item)}
            </div>
          );
        })}
        <div
          className="flex h-[50px] w-full cursor-pointer items-center justify-center text-lg font-semibold"
          onClick={() => setOpen(!isOpen)}
        >
          {!isOpen && conflicts.length > 3
            ? `V Zobacz pozostałe ${conflicts.length - 3} problemy V`
            : `^ Zwiń ^`}
        </div>
      </div>
    </WidgetBox>
  );
};

export default ConflictBox;
