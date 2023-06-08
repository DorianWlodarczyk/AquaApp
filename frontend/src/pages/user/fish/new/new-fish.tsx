import React, { useEffect, useState } from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import { Color } from "../../../../components/widget-box/icon-box/icon-box";
import SailingIcon from "@mui/icons-material/Sailing";
import getAquariumImg from "../../../../utils/images/aquarium-image";
import DropDownList from "../../../../components/drop-down-list/drop-down-list";
import InputText from "../../../../components/input-text/input-text";
import { SpeciesData } from "../../../../utils/models/fish/species-data";
import FishApi from "../../../../utils/api/fish/fish-api.service";
import { FetchStatus } from "../../../../utils/models/fetch-status";
import Loader from "../../../../components/loader/loader";
import AquariumApi from "../../../../utils/api/aquarium/aquarium-api.service";
import { AquariumNameAndImg } from "../../../../utils/models/aquarium/aquarium-name-and-img";
import { useParams } from "react-router-dom";

const NewFishPage = () => {
  const [fishName, setFishName] = useState("");
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.NotStarted);
  const [species, setSpecies] = useState<SpeciesData[]>([]);
  const [aqua, setAqua] = useState<AquariumNameAndImg>({ name: "", imgID: "" });

  const { id } = useParams();

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const data = await FishApi.getSpecies();
        setSpecies(data);
      } catch {}
    };

    const fetchAquaNameAndImg = async () => {
      try {
        const data = await AquariumApi.getNameAndImg(id || "");
        setAqua(data);
      } catch {}
    };

    const fetch = async () => {
      setStatus(FetchStatus.Loading);

      await Promise.all([fetchSpecies(), fetchAquaNameAndImg()]);

      setStatus(FetchStatus.Loaded);
    };

    fetch();
  }, [id]);

  return (
    <Loader status={status}>
      <div className="w-full p-5 py-10">
        <WidgetBox
          className=""
          title="Nowa ryba"
          color={Color.BLUE}
          icon={<SailingIcon />}
        >
          <div className="my-5 flex w-full flex-row justify-between">
            <div className=" flex h-full w-full flex-col items-center justify-center">
              <img
                className="h-[200px] w-[200px]"
                src={getAquariumImg(aqua.imgID)}
                alt=""
              />
              <div className="mt-5 text-2xl">{aqua.name}</div>
            </div>
            <div className="flex w-full justify-center">
              <div className="flex w-9/12 flex-col items-center gap-10">
                <InputText
                  label="Nazwa"
                  value={fishName}
                  onChange={(value) => setFishName(value)}
                />
                <DropDownList
                  label="Gatunek"
                  options={species.map((item) => {
                    return {
                      name: item.name,
                      value: item.id,
                    };
                  })}
                />
              </div>
            </div>
            <div className="w-full">c</div>
          </div>
        </WidgetBox>
      </div>
    </Loader>
  );
};

export default NewFishPage;
