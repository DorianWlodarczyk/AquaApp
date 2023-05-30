import React, { useEffect, useState } from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import Form, {
  getInitState,
  inputConfig,
  inputData,
} from "../../../../components/form/form";

const inputsConfig: inputConfig[] = [
  {
    type: "IMG",
    name: "imgID",
    className: "row-span-4 lg:col-span-2 col-span-full",
  },
  {
    type: "TEXT",
    label: "Nazwa",
    name: "name",
    helperText: "Max 32 znaki",
    className: "lg:col-span-4 col-span-full",
  },
  { type: "LABEL", label: "Wymiary" },
  {
    type: "TEXT",
    name: "length",
    label: "Długość",
    helperText: "Wartość [cm]",
  },
  {
    type: "TEXT",
    name: "width",
    label: "Szerokość",
    helperText: "Wartość [cm]",
  },
  {
    type: "TEXT",
    name: "height",
    label: "Wysokość",
    helperText: "Wartość [cm]",
  },
  { type: "LABEL", label: "Akcesoria" },
  {
    type: "TEXT",
    name: "heaterID",
    label: "Grzałka",
    helperText: "Wybierz rodzaj grzałki",
  },
  {
    type: "TEXT",
    name: "pumpID",
    label: "Pompa",
    helperText: "Wybierz rodzaj pompy",
  },
  {
    type: "TEXT",
    name: "lampID",
    label: "Lampa",
    helperText: "Wybierz rodzaj lampy",
  },
];

const NewAquarium = () => {
  const [data, setData] = useState<inputData[]>(getInitState(inputsConfig));

  return (
    <div className="h-full w-full px-5 py-10">
      <WidgetBox title="Nowe akwarium" icon={<QueuePlayNextIcon />}>
        <div className="flex flex-row">
          <Form
            inputs={inputsConfig}
            className="grid-cols-1 px-3 md:grid-cols-4 lg:grid-cols-6"
            values={data}
            onChange={(values) => setData(values)}
          />
        </div>
      </WidgetBox>
    </div>
  );
};

export default NewAquarium;
