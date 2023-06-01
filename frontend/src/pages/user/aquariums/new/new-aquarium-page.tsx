import React, { useEffect, useState } from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import ProgressBar from "./progress-bar/progress-bar";
import Step1 from "./steps/Step1";

export interface inputData {
  value: string;
  error: boolean;
  name: string;
}

const NewAquariumPage = () => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<inputData[]>([]);

  const onChange = (value: string, name: string) => {
    const newInputsList = [...inputs];

    newInputsList.find((item) => item.name === name)!.value = value;

    setInputs(newInputsList);
  };

  useEffect(() => {
    setInputs([
      { name: "name", value: "", error: false },
      { name: "imgID", value: "1", error: false },
    ]);
  }, []);

  return (
    <div className="flex justify-center px-5 py-10">
      <WidgetBox title="Krok 1" icon={<QueuePlayNextIcon />}>
        <ProgressBar
          labels={["Wstęp", "Rozmiar", "Wyposażenie", "Dodatki", "Koniec"]}
          step={step}
        />
        <div>{step === 0 && <Step1 onChange={onChange} values={inputs} />}</div>
      </WidgetBox>
    </div>
  );
};

export default NewAquariumPage;
