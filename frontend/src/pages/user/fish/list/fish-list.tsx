import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../../../components/loader/loader";
import { FetchStatus } from "../../../../utils/models/fetch-status";
import { Link } from "react-router-dom";
import FishButton from "./components/fish-button";
import FishListApi from "./fish-list-api.service";
import NewFishButton from "./components/new-fish-button";
import { SpeciesData } from "../../../../utils/models/fish/species-data";
import { FishListData } from "../../../../utils/models/fish/fish-data";

const FishList = () => {
  const [status, setStatus] = useState(FetchStatus.NotStarted);
  const [species, setSpecies] = useState<SpeciesData[]>([]);
  const [fishList, setFishList] = useState<FishListData[]>([]);

  useEffect(() => {
    const fetchFishData = async () => {
      setStatus(FetchStatus.Loading);

      try {
        const data = await FishListApi.getFishList();
        setFishList(data);
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
    return (
      <>
        {fishList.map((item, index) => {
          return (
            <div key={index}>
              <div>{item.aquariumName}</div>
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
      <div>{renderFish()}</div>
    </Loader>
  );
};

export default FishList;
