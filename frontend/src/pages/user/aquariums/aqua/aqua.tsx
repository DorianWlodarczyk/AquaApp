import React, { useEffect, useState } from "react";
import Widgets from "./components/widgets";
import InfoBox from "./components/info-box";
import LogsBox from "./components/logs-box";
import ConflictBox from "./components/conflict-box";
import Loader from "../../../../components/loader/loader";
import { FetchStatus } from "../../../../utils/models/fetch-status";
import AquaApi from "./aqua-api.service";
import { AquaInfo } from "../../../../utils/models/aquarium/aqua-info";
import FishApi from "../../../../utils/api/fish-api.service";
import { AquaHistory } from "../../../../utils/models/aquarium/aqua-history";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/button/button";

const emptyState = {
  fishNumber: 0,
  width: 0,
  height: 0,
  length: 0,
  aquaName: "",
  aquaImg: "",
  heaterName: "",
  lampName: "",
  pumpName: "",
  assetName: "",
  plantName: "",
  groundName: "",
  history: [],
};

const AquaPage = () => {
  const [aquaInfo, setAquaInfo] = useState<AquaInfo>(emptyState);
  const [conflictList, setConflictList] = useState<string[]>([]);
  const [status, setStatus] = useState(FetchStatus.NotStarted);
  const [historyList, setHistoryList] = useState<AquaHistory[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAquaInfo = async () => {
      setStatus(FetchStatus.Loading);
      const data = await AquaApi.getAquaInfo(id!);
      if (!data) {
        return;
      }
      console.log("🚀 ~ file: aqua.tsx:41 ~ fetchAquaInfo ~ data:", data);
      setAquaInfo(data);
      const newHistory: AquaHistory[] = data.history.map((item, index) => {
        return {
          id: index,
          time: item.time,
          text: item.text,
        };
      });
      setHistoryList(newHistory);
      setStatus(FetchStatus.Loaded);
    };

    const fetchConflicts = async () => {
      setStatus(FetchStatus.Loading);
      const data = await FishApi.getAquariumsWithFish();
      const species = await FishApi.getSpecies();
      const fish = data.find(
        (item) => item.aquariumID.toString() === id?.toString()
      )?.fish;
      if (!fish) return;

      const newConflictsList: string[] = [];
      for (let item of fish) {
        if (!item.conflicts) {
          continue;
        }

        let newConflict = `Konflikt między **${
          species.find((i) => item.species.toString() === i.id.toString())?.name
        }** a gatunkami **(`;

        for (let con of item.conflicts) {
          newConflict += `${
            species.find((i) => i.id.toString() === con.toString())?.name
          }, `;

          newConflict = newConflict.slice(0, -2);
          newConflict += `)**`;
          newConflictsList.push(newConflict);
        }
      }
      setConflictList(newConflictsList);
      setStatus(FetchStatus.Loaded);
    };

    fetchAquaInfo();
    fetchConflicts();
  }, []);

  return (
    <Loader status={status}>
      <div className="h-full w-full px-5 py-8">
        <Widgets aquaInfo={aquaInfo} conflicts={conflictList} />
        <InfoBox aquaInfo={aquaInfo} />
        {conflictList.length > 0 && <ConflictBox conflicts={conflictList} />}
        <LogsBox aquaHistory={historyList} />
        <div className="p-5">
          <Button text="Edytuj akwarium" onClick={() => navigate("edit")} />
        </div>
      </div>
    </Loader>
  );
};

export default AquaPage;
