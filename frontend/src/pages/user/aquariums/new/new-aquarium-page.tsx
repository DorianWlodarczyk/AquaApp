import React, { useState } from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import ImgPicker from "../../../../components/img-picker/img-picker";
import InputText from "../../../../components/input-text/input-text";
import Button from "../../../../components/button/button";
import dimensions from "../../../../img/dimensions.png";
const NewAquariumPage = () => {
  const [step, setStep] = useState(1);

  const step1 = () => {
    return (
      <div className="flex justify-center px-5 py-10">
        <WidgetBox
          title="Krok 1"
          icon={<QueuePlayNextIcon />}
          className="w-9/12"
        >
          <div className="w-full text-center text-2xl">
            Wybierz ikonę oraz nazwę akwarium
          </div>
          <div className="my-5 flex flex-row justify-around">
            <div>
              <ImgPicker
                onClick={(value) => {
                  console.log(value);
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div>
                <InputText label="Nazwa akwarium" helperText="Max 32 znaki" />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center">
            <Button text="Dalej" onClick={() => setStep(2)} />
          </div>
        </WidgetBox>
      </div>
    );
  };

  const step2 = () => {
    return (
      <div className="flex justify-center px-5 py-10">
        <WidgetBox
          title="Krok 2"
          icon={<QueuePlayNextIcon />}
          className="w-9/12"
        >
          <div className="w-full text-center text-2xl">
            Podaj wymiary akwarium
          </div>
          <div className="my-5 flex flex-row justify-around">
            <div>
              <img src={dimensions} alt="dimensions" />
            </div>
            <div className="flex flex-col justify-center gap-10">
              <InputText label="Długość" helperText="Wartość w cm" />
              <InputText label="Szerokość" helperText="Wartość w cm" />
              <InputText label="Wysokość" helperText="Wartość w cm" />
            </div>
          </div>

          <div className="flex w-full justify-center gap-5">
            <Button text="Wróć" onClick={() => setStep(1)} />
            <Button text="Dalej" onClick={() => setStep(3)} />
          </div>
        </WidgetBox>
      </div>
    );
  };

  const step3 = () => {
    return (
      <div className="flex justify-center px-5 py-10">
        <WidgetBox
          title="Krok 3"
          icon={<QueuePlayNextIcon />}
          className="w-9/12"
        >
          <div className="w-full text-center text-2xl">Wybierz akcesoria</div>

          <div className="flex w-full justify-center gap-5">
            <Button text="Wróć" onClick={() => setStep(2)} />
            <Button
              text="Stwórz"
              onClick={() => console.log("Nowe akwarium")}
            />
          </div>
        </WidgetBox>
      </div>
    );
  };

  switch (step) {
    case 1:
      return step1();

    case 2:
      return step2();

    case 3:
      return step3();

    default:
      return <></>;
  }
};

export default NewAquariumPage;
