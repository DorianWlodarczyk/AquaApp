import React, { useEffect, useState } from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import ProgressBar from "./components/progress-bar/progress-bar";
import Step1 from "./steps/Step1";
import Button from "../../../../components/button/button";
import {
  anyCharacter,
  aquariumDimension,
  maxNameLength,
} from "../../../../utils/regex/text-input.regex";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Loader from "../../../../components/loader/loader";
import { FetchStatus } from "../../../../utils/models/fetch-status";
import NewAquariumApi from "./new-aquarium-api.service";
import AccessoriesData from "../../../../utils/models/accessories/accessories-data";
import Step4 from "./steps/Step4";

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
  const [status, setStatus] = useState(FetchStatus.NotStarted);
  const [title, setTitle] = useState("");
  const [volume, setVolume] = useState(0);
  const [accessories, setAccessories] = useState<AccessoriesData>({
    heaters: [],
    pumps: [],
    lamps: [],
    assets: [],
    plants: [],
    grounds: [],
  });

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
    ["heater", "pump", "lamp"],
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

  const checkInputs = (newStep: number = step) => {
    if (inputs.length === 0) {
      setEnabledButton(false);
      return;
    }

    let isOk = true;
    for (let i = 0; i <= newStep; i++) {
      for (let item of inputsOnPage[Math.min(i, inputsOnPage.length - 1)]) {
        isOk =
          (isOk && !inputs.find((element) => element.name === item)?.error) ??
          false;
      }
    }
    setEnabledButton(isOk);
  };

  const changeStep = (newStep: number) => {
    checkInputs(newStep);
    setStep(newStep);
  };

  useEffect(() => {
    let newTitle = "";
    if (step >= 0) {
      const name = `${inputs.find((item) => item.name === "name")?.value}`;
      if (name === "") {
        newTitle = "Nowe akwarium";
      } else {
        if (name.length <= 20) {
          newTitle = name;
        } else {
          newTitle = `${name.slice(0, 20)}...`;
        }
      }
    }

    if (step >= 1) {
      const width = `${inputs.find((item) => item.name === "width")?.value}`;
      const height = `${inputs.find((item) => item.name === "height")?.value}`;
      const length = `${inputs.find((item) => item.name === "length")?.value}`;
      const v = (Number(width) * Number(height) * Number(length)) / 1000;

      if (Number.isNaN(v)) {
        newTitle += " > ???";
      } else {
        newTitle += ` > ${Math.round(v)}L`;
      }

      setVolume(Math.round(v));
    }
    setTitle(newTitle);
  }, [inputs, step]);

  useEffect(() => {
    setInputs([
      { name: "name", value: "", error: true, pattern: maxNameLength },
      { name: "imgID", value: "1", error: false },
      { name: "width", value: "50", error: false, pattern: aquariumDimension },
      { name: "height", value: "50", error: false, pattern: aquariumDimension },
      { name: "length", value: "50", error: false, pattern: aquariumDimension },
      { name: "heater", value: "", error: true, pattern: anyCharacter },
      { name: "pump", value: "", error: true, pattern: anyCharacter },
      { name: "lamp", value: "", error: true, pattern: anyCharacter },
      { name: "asset", value: "", error: true, pattern: anyCharacter },
      { name: "plant", value: "", error: true, pattern: anyCharacter },
      { name: "ground", value: "", error: true, pattern: anyCharacter },
    ]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(FetchStatus.Loading);

      try {
        const data = await NewAquariumApi.fetchAccessoriesData();
        setAccessories(data);
        setStatus(FetchStatus.Loaded);
      } catch {}
    };

    fetchData();
  }, []);

  return (
    <Loader status={status}>
      <div className="flex justify-center px-5 py-10">
        <WidgetBox title={title} icon={<QueuePlayNextIcon />}>
          <ProgressBar
            labels={progressLabels}
            step={step}
            imgID={`${inputs.find((item) => item.name === "imgID")?.value}`}
          />
          <div>
            {step === 0 && <Step1 onChange={onChange} values={inputs} />}
          </div>
          <div>
            {step === 1 && <Step2 onChange={onChange} values={inputs} />}
          </div>
          <div>
            {step === 2 && (
              <Step3
                accessories={accessories}
                onChange={onChange}
                values={inputs}
                volume={volume}
              />
            )}
          </div>
          <div>
            {step === 3 && (
              <Step4
                accessories={accessories}
                onChange={onChange}
                values={inputs}
              />
            )}
          </div>

          <div className="mt-8 flex justify-center">
            {step === 0 && (
              <div>
                <Button
                  text="Dalej"
                  enabled={enabledButton}
                  onClick={() => changeStep(step + 1)}
                />
              </div>
            )}

            {step > 0 && step < progressLabels.length - 1 && (
              <div>
                <Button
                  text="Poprzednie"
                  onClick={() => changeStep(step - 1)}
                />
                <Button
                  text="Dalej"
                  enabled={enabledButton}
                  onClick={() => changeStep(step + 1)}
                />
              </div>
            )}

            {step === progressLabels.length - 1 && (
              <div>
                <Button text="Poprzednie" onClick={() => setStep(step - 1)} />
                <Button
                  text="Zakończ"
                  enabled={enabledButton}
                  onClick={() => changeStep(step)}
                />
              </div>
            )}
          </div>
        </WidgetBox>
      </div>
    </Loader>
  );
};

export default NewAquariumPage;
