import React from "react";
import WidgetBox from "../../../../../components/widget-box/widget-box";
import { Color } from "../../../../../components/widget-box/icon-box/icon-box";
import getAquariumImg from "../../../../../utils/images/aquarium-image";
import InfoIcon from "@mui/icons-material/Info";
import { AquaInfo } from "../../../../../utils/models/aquarium/aqua-info";

interface props {
  aquaInfo: AquaInfo;
}

const InfoBox = ({ aquaInfo }: props) => {
  return (
    <WidgetBox className="mt-8" icon={<InfoIcon />} color={Color.BLUE}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <img
            src={getAquariumImg(aquaInfo.aquaImg)}
            alt="aqua"
            className="w-[255px]"
          />
          <div className="mt-4 text-center text-xl font-semibold text-gray-700">
            {aquaInfo.aquaName}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-y-5 font-semibold sm:grid-cols-2">
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-sm  text-gray-600">Grzałka</div>
              <div className="text-xl">{aquaInfo.heaterName}</div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-sm text-gray-600">Pompa</div>
              <div className="text-xl">{aquaInfo.pumpName}</div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-sm text-gray-600">Oświetlenie</div>
              <div className="text-xl">{aquaInfo.lampName}</div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-sm text-gray-600">Dodatki</div>
              <div className="text-xl">{aquaInfo.assetName}</div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-sm text-gray-600">Rośliny</div>
              <div className="text-xl">{aquaInfo.plantName}</div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-sm text-gray-600">Podłoże</div>
              <div className="text-xl">{aquaInfo.groundName}</div>
            </div>
          </div>
        </div>
      </div>
    </WidgetBox>
  );
};

export default InfoBox;
