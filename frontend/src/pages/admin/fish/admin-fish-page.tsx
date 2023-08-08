import React, { useEffect, useState } from "react";
import WidgetBox from "../../../components/widget-box/widget-box";
import { Color } from "../../../components/widget-box/icon-box/icon-box";
import { ConflictsData } from "../../../utils/models/fish/conflicts-data";
import { SpeciesData } from "../../../utils/models/fish/species-data";
import { FetchStatus } from "../../../utils/models/fetch-status";
import Loader from "../../../components/loader/loader";
import FishApi from "../../../utils/api/fish-api.service";
import InputText from "../../../components/input-text/input-text";
import Button from "../../../components/button/button";
import AdminFishApi from "./admin-fish-api.service";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import DropDownList, {
  DropDownOption,
} from "../../../components/drop-down-list/drop-down-list";

const AdminFishPage = () => {
  const [conflicts, setConflicts] = useState<ConflictsData[]>([]);
  const [speciesName, setSpeciesName] = useState<SpeciesData[]>([]);
  const [dropDownSpecies, setDropDownSpecies] = useState<DropDownOption[]>([]);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.NotStarted);
  const [activeID, setActiveID] = useState("");
  const [newName, setNewName] = useState("");
  const [newConflictID, setNewConflictID] = useState("");

  const renderTable = () => {
    return (
      <div className="min-w-[500px] ">
        <div className="item-center flex h-[45px] flex-row bg-zinc-50 pl-3 odd:bg-zinc-100">
          <div className="flex w-[25px] items-center text-center">ID</div>
          <div className="flex w-[400px] items-center">Nazwa</div>
          <div className="flex items-center">Konflikty</div>
        </div>

        {speciesName.map((item, index) => {
          return renderRow(index, item);
        })}
      </div>
    );
  };

  const renderRow = (index: number, item: SpeciesData) => {
    return (
      <div
        className={`item-center flex h-[45px] cursor-pointer flex-row bg-zinc-50 pl-3 odd:bg-zinc-100 hover:bg-zinc-200 
          ${activeID === item.id ? "font-bold" : ""}
          `}
        key={index}
        onClick={() => setActiveID(item.id)}
      >
        <div className="flex w-[25px] items-center text-center">
          {item.id.length > 5 ? "" : item.id}
        </div>
        <div className="flex w-[400px] items-center text-center">
          {item.name}
        </div>
        <div className="flex items-center text-center">
          {conflicts
            .find((val) => val.speciesID === item.id)
            ?.conflicts.map((con, index) => {
              return (
                <div key={index} className="inline">
                  {(speciesName.find((eee) => eee.id === con)?.name || "") +
                    ", "}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const renderNew = () => {
    return (
      <div>
        <div className="flex flex-col md:flex-row">
          <div className="flex  flex-col gap-10 p-5 md:w-1/3">
            <InputText
              label="Nazwa gatunku"
              value={newName}
              onChange={(val) => setNewName(val)}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-around gap-5 sm:flex-row">
            <div className="">
              <Button text="Dodaj" onClick={() => addSpecies()} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEditor = () => {
    return (
      <div>
        <div className="flex flex-col md:flex-row">
          <div className="flex  flex-col gap-10 p-5 md:w-1/3">
            <InputText
              label="Nazwa gatunku"
              value={newName}
              onChange={(val) => setNewName(val)}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-around gap-5 sm:flex-row">
            <div className="">
              <Button
                text="Zatwierdź"
                onClick={() => editRow(activeID)}
                enabled={activeID.length < 5}
              />
            </div>
            <div>
              <Button text="Usuń" onClick={() => deleteRow(activeID)} />
            </div>
            <div>
              <Button
                text="Anuluj"
                onClick={() => {
                  setActiveID("");
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row">
          {renderConflictsEditor()}
        </div>
      </div>
    );
  };

  const renderConflictsEditor = () => {
    return (
      <div className="flex w-full flex-col justify-between md:flex-row">
        <div className="flex w-full flex-col items-center gap-10 p-5 md:w-1/4">
          <DropDownList
            options={dropDownSpecies}
            value={newConflictID}
            onChange={(val) => setNewConflictID(val)}
          />
          <div className="w-1/2">
            <Button
              text="Dodaj"
              enabled={newConflictID !== ""}
              onClick={addConflict}
            />
          </div>
        </div>
        <div className="w-2/4">
          {conflicts
            .find((val) => val.speciesID === activeID)
            ?.conflicts.map((con, index) => {
              return (
                <div
                  key={index}
                  className="mb-4 flex flex-row text-lg font-semibold"
                >
                  <div
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteConflict(con)}
                  >
                    <HighlightOffTwoToneIcon />
                  </div>
                  <div className="ml-3 flex h-full justify-center">
                    {speciesName.find((eee) => eee.id === con)?.name || ""}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const deleteRow = (id: string) => {
    AdminFishApi.deleteSpecies(id);
    const newSpeciesList = speciesName.filter((item) => item.id !== id);
    setSpeciesName(newSpeciesList);
    setActiveID("");
  };

  const editRow = (id: string) => {
    AdminFishApi.editSpecies(id, newName);
    const newSpeciesList = [...speciesName];
    for (let item of newSpeciesList) {
      if (item.id === id) {
        item.name = newName;
      }
    }

    setSpeciesName(newSpeciesList);
  };

  const addConflict = () => {
    //TODO Dodaj do API

    const newConflictList = [...conflicts];

    const newActID = newConflictList.find(
      (item) => item.speciesID === activeID
    );

    if (newActID?.conflicts) {
      newActID?.conflicts.push(newConflictID);
    } else {
      newConflictList.push({ speciesID: activeID, conflicts: [newConflictID] });
    }

    const newConf = newConflictList.find(
      (item) => item.speciesID === newConflictID
    );

    if (newConf?.conflicts) {
      newConf?.conflicts.push(activeID);
    } else {
      newConflictList.push({ speciesID: newConflictID, conflicts: [activeID] });
    }

    setNewConflictID("");
    setConflicts(newConflictList);
  };

  const deleteConflict = (id: string) => {
    //TODO Dodaj do API
    const newConflictList = [...conflicts];

    const temp1 = newConflictList.find((item) => item.speciesID === activeID);
    if (temp1)
      temp1.conflicts = temp1?.conflicts.filter((item) => item !== id)!;

    for (let item of newConflictList) {
      item.conflicts = item.conflicts.filter((val) => val !== activeID);
    }

    setConflicts(newConflictList);
  };

  const addSpecies = () => {
    //TODO Dodaj do api

    const newSpeciesName = [...speciesName];
    newSpeciesName.push({
      id: `${new Date().getTime()}`,
      name: newName,
    });

    setSpeciesName(newSpeciesName);
  };

  useEffect(() => {
    const fetchConflicts = async () => {
      setStatus(FetchStatus.Loading);

      try {
        const data = await FishApi.getConflicts();
        setConflicts(data);
      } catch {}

      try {
        const data = await FishApi.getSpecies();
        setSpeciesName(data);
      } catch {}

      setStatus(FetchStatus.Loaded);
    };

    fetchConflicts();
  }, []);

  useEffect(() => {
    const newDropdownList: DropDownOption[] = speciesName.map((item) => {
      return { name: item.name, value: item.id };
    });

    setDropDownSpecies(newDropdownList);
  }, [speciesName]);

  useEffect(() => {
    setNewName(`${speciesName.find((val) => val.id === activeID)?.name || ""}`);
    setNewConflictID("");
  }, [activeID, speciesName]);

  return (
    <Loader status={status}>
      <div className="p-8">
        <WidgetBox title="Ryby" color={Color.BLUE}>
          <div className="m-5 overflow-scroll border">{renderTable()}</div>
          {activeID && renderEditor()}
          {!activeID && renderNew()}
        </WidgetBox>
      </div>
    </Loader>
  );
};

export default AdminFishPage;
