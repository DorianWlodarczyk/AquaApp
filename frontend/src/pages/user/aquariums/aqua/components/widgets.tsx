import React from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SailingIcon from "@mui/icons-material/Sailing";
import StraightenIcon from "@mui/icons-material/Straighten";
import WidgetBox from "../../../../../components/widget-box/widget-box";
import { Color } from "../../../../../components/widget-box/icon-box/icon-box";
import ReportIcon from "@mui/icons-material/Report";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate, useParams } from "react-router-dom";
import { AquaInfo } from "../../../../../utils/models/aquarium/aqua-info";

interface props {
  aquaInfo: AquaInfo;
  conflicts: string[];
}

const Widgets = ({ aquaInfo, conflicts }: props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      <WidgetBox
        color={Color.GREEN}
        icon={<SailingIcon />}
        title="Ryby"
        onClick={() => navigate(`/aqua/${id}/fish`)}
      >
        <div className="flex h-[75px] flex-row items-center justify-around">
          <div className="text-2xl font-semibold text-gray-700">
            Ryby w akwarium:
          </div>
          <div className="text-4xl font-semibold text-gray-700">
            {aquaInfo.fishNumber}
          </div>
        </div>
        <div className="absolute bottom-2 w-full text-center text-sm">
          (Zobacz wszystkie)
        </div>
      </WidgetBox>

      <WidgetBox
        color={Color.BLUE}
        icon={<AcUnitIcon />}
        title="Ostatnia zmiana"
      >
        <div className="px-8 py-2 text-lg font-semibold text-gray-800">
          {aquaInfo.history[aquaInfo.history.length - 1]?.text || ""}
        </div>
      </WidgetBox>

      <WidgetBox color={Color.PURPLE} icon={<StraightenIcon />} title="Wymiary">
        <div className="flex h-full flex-row items-center justify-center">
          <div className="ml-8 grid w-3/12 grid-cols-2 gap-x-5">
            <div className="font-semibold text-gray-500">Wys:</div>
            <div className="font-semibold text-gray-500">
              {aquaInfo.height}cm
            </div>
            <div className="font-semibold text-gray-500">Szer:</div>
            <div className="font-semibold text-gray-500">
              {aquaInfo.width}cm
            </div>
            <div className="font-semibold text-gray-500">Dł:</div>
            <div className="font-semibold text-gray-500">
              {aquaInfo.height}cm
            </div>
          </div>

          <div className="w-full text-center text-4xl font-semibold text-gray-700">
            {(aquaInfo.height * aquaInfo.width * aquaInfo.height) / 1000}L
          </div>
        </div>
      </WidgetBox>

      <WidgetBox
        color={conflicts.length > 0 ? Color.RED : Color.GREEN}
        icon={conflicts.length > 0 ? <ReportIcon /> : <DoneIcon />}
        title="Uwagi"
      >
        <div className="flex h-[75px] items-center justify-center">
          <div className="text-2xl font-semibold text-gray-700">
            {conflicts.length > 0
              ? `Wykryte problemy - ${conflicts.length}`
              : `Brak uwag :)`}
          </div>
        </div>
      </WidgetBox>
    </div>
  );
};

export default Widgets;
