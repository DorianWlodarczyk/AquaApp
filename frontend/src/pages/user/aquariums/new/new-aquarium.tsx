import React from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import ImgPicker from "./components/img-picker/img-picker";

const NewAquarium = () => {
  return (
    <div className="h-full w-full px-5 py-10">
      <WidgetBox title="Nowe akwarium">
        <div className="max-w-[400px]">
          <ImgPicker onClick={(value) => console.log(value)} />
        </div>
      </WidgetBox>
    </div>
  );
};

export default NewAquarium;
