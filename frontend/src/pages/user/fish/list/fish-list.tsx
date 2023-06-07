import React, { useEffect, useState } from "react";
import Loader from "../../../../components/loader/loader";
import { FetchStatus } from "../../../../utils/models/fetch-status";
import FishButton from "./components/fish-button";
import FishListApi from "./fish-list-api.service";
import NewFishButton from "./components/new-fish-button";
import { SpeciesData } from "../../../../utils/models/fish/species-data";
import {
  FishData,
  FishListData,
} from "../../../../utils/models/fish/fish-data";
import InputText from "../../../../components/input-text/input-text";
import CheckboxList, {
  CheckboxData,
} from "../../../../components/checkbox-list/checkbox-list";
import { useParams } from "react-router-dom";
import Button from "../../../../components/button/button";

const FishList = () => {
  const [status, setStatus] = useState(FetchStatus.NotStarted);
  const [species, setSpecies] = useState<SpeciesData[]>([]);
  const [fishList, setFishList] = useState<FishListData[]>([]);
  const [filteredFish, setFilteredFish] = useState<FishListData[]>([]);
  const [searchText, setSearchText] = useState("");

  const [aquaCheckboxes, setAquaCheckboxes] = useState<CheckboxData[]>([]);
  const [speciesCheckboxes, setSpeciesCheckboxes] = useState<CheckboxData[]>(
    []
  );

  const { id } = useParams();

  const clearAllFilter = () => {
    setSearchText("");
    setAquaCheckboxes(
      fishList.map((item) => {
        return {
          id: item.aquariumID,
          value: false,
        };
      })
    );

    setSpeciesCheckboxes(
      species.map((item) => {
        return {
          id: item.id,
          value: false,
        };
      })
    );
  };

  useEffect(() => {
    setAquaCheckboxes(
      fishList.map((item) => {
        return {
          id: item.aquariumID,
          value: id === item.aquariumID,
        };
      })
    );

    setSpeciesCheckboxes(
      species.map((item) => {
        return {
          id: item.id,
          value: false,
        };
      })
    );
  }, [fishList, id, species]);

  useEffect(() => {
    const newList: FishListData[] = [];

    let allAquaCheckboxIsNone = true;
    let allSpeciesCheckboxIsNone = true;

    for (let item of aquaCheckboxes) {
      if (item.value) {
        allAquaCheckboxIsNone = false;
      }
    }

    for (let item of speciesCheckboxes) {
      if (item.value) {
        allSpeciesCheckboxIsNone = false;
      }
    }

    for (let item of fishList) {
      const newFishList: FishData[] = [];

      if (!allAquaCheckboxIsNone) {
        const shouldRenderAqua = aquaCheckboxes.find(
          (checkbox) => checkbox.id === item.aquariumID
        )?.value;

        if (!shouldRenderAqua) continue;
      }

      for (let fish of item.fish) {
        if (fish.name.toLowerCase().includes(searchText.toLowerCase())) {
          const shouldRenderFish = speciesCheckboxes.find(
            (species) => species.id === fish.speciesID
          )?.value;

          if (!allSpeciesCheckboxIsNone) {
            if (!shouldRenderFish) continue;
          }

          newFishList.push(fish);
        }
      }

      if (newFishList.length !== 0) {
        newList.push({ ...item, fish: newFishList });
      }
    }

    setFilteredFish(newList);
  }, [fishList, searchText, species, aquaCheckboxes, speciesCheckboxes]);

  useEffect(() => {
    const fetchFishData = async () => {
      setStatus(FetchStatus.Loading);

      try {
        const data = await FishListApi.getFishList();
        setFishList(data);
        setFilteredFish(data);
        setStatus(FetchStatus.Loaded);
      } catch {}
    };

    const fetchSpeciesData = async () => {
      setStatus(FetchStatus.Loading);
      try {
        const data = await FishListApi.getSpecies();
        setSpecies(data);
        setStatus(FetchStatus.Loaded);
      } catch {}
    };

    fetchFishData();
    fetchSpeciesData();
  }, []);

  const renderFish = () => {
    const info = (fishData: FishListData) => {
      const fishCount = fishList.find(
        (item) => fishData.aquariumID === item.aquariumID
      )?.fish.length;

      const filteredFishCount = fishData.fish.length;

      if (fishCount) {
        if (fishCount !== filteredFishCount) {
          return <div>(Ukryto {fishCount - filteredFishCount})</div>;
        }
      }
    };

    return (
      <>
        {filteredFish.map((item, index) => {
          return (
            <div className="mb-[50px] mt-[25px]" key={index}>
              <div className="flex items-center">
                <div className="h-[2px] w-[100%] bg-gradient-to-r from-[#F2F3F4] to-gray-300 sm:ml-[50px] sm:mr-[10px]"></div>
                <span className="w-[500px] text-center text-2xl text-gray-600">
                  {item.aquariumName}
                  <div className="text-sm italic ">{info(item)}</div>
                </span>
                <div className="h-[2px] w-[100%] bg-gradient-to-l from-[#F2F3F4] to-gray-300 sm:ml-[10px] sm:mr-[50px]"></div>
              </div>
              <div className="m-5 grid grid-cols-1 gap-7 pb-5 md:grid-cols-2 2xl:grid-cols-4">
                {item.fish.map((fish, index) => {
                  return (
                    <FishButton
                      key={index}
                      name={fish.name}
                      species={
                        species.find((item) => item.id === fish.speciesID)
                          ?.name ?? "Brak danych"
                      }
                      aquaImg={item.aquariumImg}
                    />
                  );
                })}

                <NewFishButton aquariumID={item.aquariumID} />
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <Loader status={status}>
      <div className="flex justify-center pt-5">
        <div className="w-9/12 rounded bg-white shadow">
          <div className="w-full p-5 text-center text-2xl">
            Wyszukiwarka
            <div className="mt-5 flex justify-center">
              <div className="w-9/12">
                <InputText
                  label="Szukaj"
                  searchIcon
                  clearIcon
                  value={searchText}
                  onChange={(value) => setSearchText(value)}
                />
                <div className="mt-5 flex flex-row justify-around">
                  {fishList.length > 1 && (
                    <div className="relative">
                      <CheckboxList
                        options={fishList.map((item) => {
                          return {
                            name: item.aquariumName,
                            id: item.aquariumID,
                          };
                        })}
                        values={aquaCheckboxes}
                        onChange={(value) => setAquaCheckboxes(value)}
                        title="Filtruj akwaria"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <CheckboxList
                      options={species.map((item) => {
                        return {
                          name: item.name,
                          id: item.id,
                        };
                      })}
                      values={speciesCheckboxes}
                      onChange={(value) => setSpeciesCheckboxes(value)}
                      title="Filtruj gatunki"
                    />
                  </div>

                  <Button text="Wyczyść filtrowanie" onClick={clearAllFilter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{renderFish()}</div>
    </Loader>
  );
};

export default FishList;
