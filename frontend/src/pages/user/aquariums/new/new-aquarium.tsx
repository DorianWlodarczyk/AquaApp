import React from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import ImgPicker from "./components/img-picker/img-picker";
import InputText from "../../../../components/input-text/input-text";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
const NewAquarium = () => {
  return (
    <div className="h-full w-full px-5 py-10">
      <WidgetBox title="Nowe akwarium" icon={<QueuePlayNextIcon />}>
        <div className="flex flex-row">
          <div className="w-[400px]">
            <ImgPicker
              onClick={(value) => console.log(`Img Picker ->`, value)}
            />
          </div>
          <InputText
            label="Nazwa akwarium"
            helperText="Max 32 znaki"
            searchIcon
            clearIcon
            onChange={(value) => console.log(`Input text ->`, value)}
          />
        </div>
      </WidgetBox>
    </div>
  );
};

export default NewAquarium;
