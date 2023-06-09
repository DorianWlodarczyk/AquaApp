import React, { useEffect, useState } from "react";
import WidgetBox from "../../../../components/widget-box/widget-box";
import { Color } from "../../../../components/widget-box/icon-box/icon-box";
import SailingIcon from "@mui/icons-material/Sailing";
import getAquariumImg from "../../../../utils/images/aquarium-image";
import DropDownList from "../../../../components/drop-down-list/drop-down-list";
import InputText from "../../../../components/input-text/input-text";
import { SpeciesData } from "../../../../utils/models/fish/species-data";
import FishApi from "../../../../utils/api/fish-api.service";
import { FetchStatus } from "../../../../utils/models/fetch-status";
import Loader from "../../../../components/loader/loader";
import AquariumApi from "../../../../utils/api/aquarium-api.service";
import { AquariumNameAndImg } from "../../../../utils/models/aquarium/aquarium-name-and-img";
import { useNavigate, useParams } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import { ConflictsData } from "../../../../utils/models/fish/conflicts-data";
import Button from "../../../../components/button/button";
import { maxNameLength } from "../../../../utils/regex/text-input.regex";
import NewFishApi from "./new-fish-api.service";

const NewFishPage = () => {
  const [fishName, setFishName] = useState("");
  const [fishSpecies, setFishSpecies] = useState("");
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.NotStarted);
  const [species, setSpecies] = useState<SpeciesData[]>([]);
  const [speciesInAqua, setSpeciesInAqua] = useState<string[]>([]);
  const [conflictsList, setConflictsList] = useState<ConflictsData[]>([]);
  const [conflictsListName, setConflictsListName] = useState<string[]>([]);
  const [aqua, setAqua] = useState<AquariumNameAndImg>({ name: "", imgID: "" });
  const [nameOk, setNameOk] = useState(false);
  const [speciesOk, setSpeciesOk] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConflicts = async () => {
      try {
        const data = await FishApi.getConflicts();
        setConflictsList(data);
      } catch {}
    };

    const fetchFishSpeciesFromAquarium = async () => {
      try {
        const data = await FishApi.getFishSpeciesFromAquarium(id || "");
        setSpeciesInAqua(data);
      } catch {}
    };

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
      await Promise.all([
        fetchSpecies(),
        fetchAquaNameAndImg(),
        fetchFishSpeciesFromAquarium(),
        fetchConflicts(),
      ]);
      setStatus(FetchStatus.Loaded);
    };

    fetch();
  }, [id]);

  useEffect(() => {
    const list = conflictsList.find(
      (item) => item.speciesID === fishSpecies
    )?.conflicts;

    if (!list) {
      setConflictsListName([]);
      return;
    }

    const newConflictsListName: string[] = [];

    for (let myConflicts of list) {
      for (let speciesInAquarium of speciesInAqua) {
        if (myConflicts === speciesInAquarium) {
          newConflictsListName.push(
            `${species.find((item) => item.id === myConflicts)?.name}`
          );
        }
      }
    }
    setConflictsListName(newConflictsListName);
  }, [conflictsList, fishSpecies, species, speciesInAqua]);

  useEffect(() => {
    setSpeciesOk(fishSpecies !== "");
    setNameOk(maxNameLength.test(fishName));
  }, [fishName, fishSpecies]);

  const saveNewFish = async () => {
    try {
      await NewFishApi.saveNewFish(fishName, fishSpecies);
    } catch {}

    navigate(`/aqua/${id}/fish`);
  };

  const AquaInfo = () => {
    return (
      <div className=" flex h-full w-full flex-col items-center justify-center">
        <img
          className="h-[200px] w-[200px]"
          src={getAquariumImg(aqua.imgID)}
          alt=""
        />
        <div className="mt-5 text-2xl">{aqua.name}</div>
      </div>
    );
  };

  const Inputs = () => {
    return (
      <div className="flex w-full justify-center">
        <div className="flex w-9/12 flex-col items-center gap-10">
          <InputText
            label="Nazwa"
            value={fishName}
            onChange={(value) => setFishName(value)}
            clearIcon
            helperText="Od 3 do 32 znaków"
            error={!nameOk}
          />
          <DropDownList
            label="Gatunek"
            options={species.map((item) => {
              return {
                name: item.name,
                value: item.id,
              };
            })}
            value={fishSpecies}
            onChange={(speciesID) => setFishSpecies(speciesID)}
            error={!speciesOk}
          />
        </div>
      </div>
    );
  };

  const Hints = () => {
    return (
      <div className="flex h-full w-full justify-center">
        {conflictsListName.length > 0 && (
          <div className="w-9/12 rounded-2xl border-4 border-solid border-red-500 bg-red-50 px-5 py-2 font-semibold text-red-700">
            <div className="w-full text-center">
              <ReportIcon className="" style={{ fontSize: "50px" }} />
            </div>
            <div>
              Wybrany gatunek (
              {species.find((item) => item.id === fishSpecies)?.name}) nie
              powinien być w jednym akwarium wraz z:
              <ul className="ml-5 list-disc">
                {conflictsListName.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        )}

        {conflictsListName.length === 0 && (
          <div className="w-9/12 rounded-2xl border-4 border-solid border-green-500 bg-green-50 px-5 py-2 font-semibold text-green-700">
            <div className="w-full text-center">
              <CheckCircleOutlineTwoToneIcon
                className=""
                style={{ fontSize: "50px" }}
              />
            </div>
            <div className="text-center">Wszystko w porządku</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Loader status={status}>
      <div className="w-full p-5 py-10">
        <WidgetBox
          className=""
          title="Dodaj nową rybę"
          color={Color.BLUE}
          icon={<SailingIcon />}
        >
          <div className="my-5 flex w-full flex-row justify-between">
            <AquaInfo />
            {Inputs()}
            <Hints />
          </div>

          <div className="flex w-full justify-center">
            <div className="w-[200px]">
              <Button
                enabled={nameOk && speciesOk}
                text="Dodaj rybę"
                onClick={saveNewFish}
              />
            </div>
          </div>
        </WidgetBox>
      </div>
    </Loader>
  );
};

export default NewFishPage;
