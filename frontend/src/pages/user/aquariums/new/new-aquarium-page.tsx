import React from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import ImgPicker from "../../../../components/img-picker/img-picker";
import InputText from "../../../../components/input-text/input-text";
const NewAquariumPage = () => {
  return (
    <div className="h-full w-full px-5 py-10">
      <WidgetBox title="Nowe akwarium" icon={<QueuePlayNextIcon />}>
        <div className="w-full text-center text-2xl">
          Witaj w kreatorze akwariów
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="w-[400px]">
            <ImgPicker onClick={(value) => console.log(value)} />
          </div>
          <div className="w-full">
            <div className="w-[300px]">
              <InputText
                label="Nazwa"
                helperText="Do 32 znaków"
                onChange={(value) => console.log(value)}
              />
            </div>
          </div>
        </div>
      </WidgetBox>
    </div>
  );
};

export default NewAquariumPage;
