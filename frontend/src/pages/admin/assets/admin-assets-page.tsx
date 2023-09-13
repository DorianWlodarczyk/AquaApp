import React, { useEffect, useState } from "react";
import WidgetBox from "../../../components/widget-box/widget-box";
import { Color } from "../../../components/widget-box/icon-box/icon-box";
import AccessoriesData from "../../../utils/models/accessories/accessories-data";
import { FetchStatus } from "../../../utils/models/fetch-status";
import NewAquariumApi from "../../user/aquariums/new/new-aquarium-api.service";
import Loader from "../../../components/loader/loader";
import InputText from "../../../components/input-text/input-text";
import Button from "../../../components/button/button";
import { aquariumDimension } from "../../../utils/regex/text-input.regex";
import AdminAssetsApi from "./admin-assets-api.service";

const output: AccessoriesData = {
  heaters: [],
  lamps: [],
  pumps: [],
  assets: [],
  plants: [],
  grounds: [],
};

const AdminAssetsPage = () => {
  const [accessories, setAccessories] = useState<AccessoriesData>(output);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.NotStarted);
  const [activeID, setActiveID] = useState("");

  const [newName, setNewName] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  const [capacityError, setCapacityError] = useState(false);

  const renderTable = () => {
    const data = accessories?.assets;

    return (
      <div className="min-w-[500px] ">
        <div className="item-center flex h-[45px] flex-row bg-zinc-50 pl-3 odd:bg-zinc-100">
          <div className="flex w-[25px] items-center text-center">ID</div>
          {/* <div className="flex w-[100px] items-center">Max [V]</div> */}
          <div className="flex items-center">Nazwa</div>
        </div>
        {data?.map((item, index) => {
          return renderRow(index, item);
        })}
      </div>
    );
  };

  const renderRow = (index: number, item: any) => {
    return (
      <div
        className={`item-center flex h-[45px] cursor-pointer flex-row bg-zinc-50 pl-3 odd:bg-zinc-100 hover:bg-zinc-200 ${
          activeID === item.id ? "font-bold" : ""
        }`}
        key={index}
        onClick={() => setActiveID(item.id)}
      >
        <div className="flex w-[25px] items-center text-center">
          {item.id.length > 3 ? "" : item.id}
          {console.log(item.id)}
        </div>
        {item.maxCapacity && (
          <div className="flex w-[100px] items-center">{item.maxCapacity}</div>
        )}
        <div className="flex items-center">{item.name}</div>
      </div>
    );
  };

  const renderEditor = () => {
    return (
      <div className="flex flex-col md:flex-row">
        <div className="flex  flex-col gap-10 p-5 md:w-1/3">
          {/* <InputText
            label="Pojemność"
            value={newCapacity}
            onChange={(val) => onChangeMaxCapacity(val)}
            error={capacityError}
            helperText="Max 999L"
          /> */}
          <InputText
            label="Nazwa"
            value={newName}
            onChange={(val) => setNewName(val)}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-around gap-5 sm:flex-row">
          <div className="">
            <Button
              text="Zatwierdź"
              onClick={() => editRow(activeID)}
              enabled={!!newName && activeID.length < 4}

              // enabled={
              //   !capacityError &&
              //   !!newCapacity &&
              //   !!newName &&
              //   activeID.length < 4
              // }
            />
          </div>
          <div>
            <Button text="Usuń" onClick={() => deleteRow(activeID)} />
          </div>
          <div>
            <Button text="Anuluj" onClick={cancelButton} />
          </div>
        </div>
      </div>
    );
  };

  const renderNew = () => {
    return (
      <div className="flex flex-col md:flex-row">
        <div className="flex  flex-col gap-10 p-5 md:w-1/3">
          {/* <InputText
            label="Pojemność"
            value={newCapacity}
            onChange={(val) => onChangeMaxCapacity(val)}
            error={capacityError}
            helperText="Max 999L"
          /> */}
          <InputText
            label="Nazwa"
            value={newName}
            onChange={(val) => setNewName(val)}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-around gap-5 sm:flex-row">
          <div>
            <Button
              text="Dodaj nowy"
              onClick={addRow}
              enabled={!capacityError && !!newName}
              // enabled={!capacityError && !!newCapacity && !!newName}
            />
          </div>
        </div>
      </div>
    );
  };

  const deleteRow = (id: string) => {
    // AdminHeaterApi.deleteHeater(id);
    AdminAssetsApi.deleteAssets(id);
    const newAccessories = accessories?.assets?.filter(
      (item) => item.id !== activeID
    );

    if (accessories) {
      accessories.assets = newAccessories || [];
      setAccessories({ ...accessories });
    }
  };

  const editRow = (id: string) => {
    // AdminHeaterApi.editHeater(id, newName, newCapacity);
    AdminAssetsApi.editAssets(id, newName);

    const newAccessories = { ...accessories };

    if (newAccessories.assets) {
      for (let item of newAccessories.assets) {
        if (item.id === activeID) {
          item.name = newName;
          // item.maxCapacity = Number(newCapacity);
        }
      }
    }

    setAccessories(newAccessories);
    setActiveID("");
  };

  const addRow = () => {
    AdminAssetsApi.createAssets(newName);
    const newAccessories = { ...accessories };

    newAccessories.assets.push({
      id: `${new Date().getTime()}`,
      // maxCapacity: Number(newCapacity),
      name: newName,
    });

    setAccessories(newAccessories);
  };

  const cancelButton = () => {
    setActiveID("");
  };

  const onChangeMaxCapacity = (val: string) => {
    setNewCapacity(val);
    if (!aquariumDimension.test(val)) {
      setCapacityError(true);
    } else {
      setCapacityError(false);
    }
  };

  useEffect(() => {
    const data = accessories?.assets;
    const temp = data?.find((item) => item.id === activeID);

    setNewName(`${temp?.name || ""}`);
    // setNewCapacity(`${temp?.maxCapacity || ""}`);
  }, [activeID, accessories]);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(FetchStatus.Loading);

      try {
        const data = await NewAquariumApi.fetchAccessoriesData();
        setAccessories(data!);
        setStatus(FetchStatus.Loaded);
      } catch {}
    };

    fetchData();
  }, []);

  return (
    <Loader status={status}>
      <div className="p-8">
        <WidgetBox color={Color.BLUE} title="Dodatki">
          <div className="m-5 overflow-scroll border">{renderTable()}</div>
          {activeID && renderEditor()}

          {!activeID && renderNew()}
        </WidgetBox>
      </div>
    </Loader>
  );
};

export default AdminAssetsPage;
