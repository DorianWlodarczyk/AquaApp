import React, { useEffect, useState } from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import ProgressBar from "./progress-bar/progress-bar";
import Step1 from "./steps/Step1";
import Button from "../../../../components/button/button";
import {
  aquariumDimension,
  maxNameLength,
} from "../../../../utils/regex/text-input.regex";
import Step2 from "./steps/Step2";

export interface inputData {
  value: string;
  error: boolean;
  name: string;
  pattern?: RegExp;
}

const NewAquariumPage = () => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<inputData[]>([]);
  const [enabledButton, setEnabledButton] = useState(false);

  const progressLabels = [
    "Wstęp",
    "Rozmiar",
    "Wyposażenie",
    "Dodatki",
    "Koniec",
  ];

  const inputsOnPage = [
    ["name", "imgID"],
    ["width", "height", "length"],
  ];

  const onChange = (value: string, name: string) => {
    const newInputsList = [...inputs];

    const input = newInputsList.find((item) => item.name === name);

    if (!input) return;

    if (input.pattern) input.error = !input.pattern.test(value);

    input.value = value;
    setInputs(newInputsList);

    checkInputs();
  };

  const checkInputs = () => {
    let isOk = true;
    for (let i = 0; i <= step; i++) {
      for (let item of inputsOnPage[i]) {
        isOk =
          (isOk && !inputs.find((element) => element.name === item)?.error) ??
          false;
      }
    }
    setEnabledButton(isOk);
  };

  useEffect(() => {
    setInputs([
      { name: "name", value: "", error: true, pattern: maxNameLength },
      { name: "imgID", value: "1", error: false },
      { name: "width", value: "50", error: false, pattern: aquariumDimension },
      { name: "height", value: "50", error: false, pattern: aquariumDimension },
      { name: "length", value: "50", error: false, pattern: aquariumDimension },
    ]);
  }, []);

  return (
    <div className="flex justify-center px-5 py-10">
      <WidgetBox title="Krok 1" icon={<QueuePlayNextIcon />}>
        <ProgressBar
          labels={progressLabels}
          step={step}
          imgID={`${inputs.find((item) => item.name === "imgID")?.value}`}
        />
        <div>{step === 0 && <Step1 onChange={onChange} values={inputs} />}</div>
        <div>{step === 1 && <Step2 onChange={onChange} values={inputs} />}</div>

        <div className="mt-8 flex justify-center">
          {step === 0 && (
            <div>
              <Button
                text="Dalej"
                enabled={enabledButton}
                onClick={() => setStep(step + 1)}
              />
            </div>
          )}

          {step > 0 && step < progressLabels.length - 1 && (
            <div>
              <Button text="Poprzednie" onClick={() => setStep(step - 1)} />
              <Button
                text="Dalej"
                enabled={enabledButton}
                onClick={() => setStep(step + 1)}
              />
            </div>
          )}

          {step === progressLabels.length - 1 && (
            <div>
              <Button text="Poprzednie" onClick={() => setStep(step - 1)} />
              <Button
                text="Zakończ"
                enabled={enabledButton}
                onClick={() => setStep(step)}
              />
            </div>
          )}
        </div>
      </WidgetBox>
    </div>
  );
};

export default NewAquariumPage;
