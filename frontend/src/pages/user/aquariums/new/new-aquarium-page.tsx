import React, { useEffect, useState } from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import ProgressBar from "./progress-bar/progress-bar";
import Step1 from "./steps/Step1";
import Button from "../../../../components/button/button";

export interface inputData {
  value: string;
  error: boolean;
  name: string;
}

const NewAquariumPage = () => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<inputData[]>([]);

  const progressLabels = [
    "Wstęp",
    "Rozmiar",
    "Wyposażenie",
    "Dodatki",
    "Koniec",
  ];

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
        <ProgressBar labels={progressLabels} step={step} />
        <div>{step === 0 && <Step1 onChange={onChange} values={inputs} />}</div>

        <div className="flex justify-center">
          {step === 0 && (
            <div>
              <Button text="Dalej" onClick={() => setStep(step + 1)} />
            </div>
          )}

          {step > 0 && step < progressLabels.length - 1 && (
            <div>
              <Button text="Poprzednie" onClick={() => setStep(step - 1)} />
              <Button text="Dalej" onClick={() => setStep(step + 1)} />
            </div>
          )}

          {step === progressLabels.length - 1 && (
            <div>
              <Button text="Poprzednie" onClick={() => setStep(step - 1)} />
              <Button text="Zakończ" onClick={() => setStep(step + 1)} />
            </div>
          )}
        </div>
      </WidgetBox>
    </div>
  );
};

export default NewAquariumPage;
