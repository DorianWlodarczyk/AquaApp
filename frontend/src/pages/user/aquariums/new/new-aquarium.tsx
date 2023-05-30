import React from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import Form, { inputConfig } from "../../../../components/form/form";

const inputsConfig: inputConfig[] = [
  { type: "IMG", className: "row-span-4" },
  {
    type: "TEXT",
    label: "Nazwa",
    helperText: "Max 32 znaki",
    className: "col-span-2",
  },
  { type: "TEXT", label: "Długość", helperText: "helper Text" },
  { type: "TEXT", label: "Szerokość", helperText: "helper Text" },
  { type: "TEXT", label: "Wysokość", helperText: "helper Text" },
  { type: "TEXT", label: "Grzałka", helperText: "helper Text" },
  { type: "TEXT", label: "Pompa", helperText: "helper Text" },
  { type: "TEXT", label: "Lampa", helperText: "helper Text" },
];

const NewAquarium = () => {
  return (
    <div className="h-full w-full px-5 py-10">
      <WidgetBox title="Nowe akwarium" icon={<QueuePlayNextIcon />}>
        <div className="flex flex-row">
          <Form inputs={inputsConfig} className="grid-cols-3" />
        </div>
      </WidgetBox>
    </div>
  );
};

export default NewAquarium;
