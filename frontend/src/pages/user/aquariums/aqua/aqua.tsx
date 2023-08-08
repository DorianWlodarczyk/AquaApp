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
  useEffect(() => {
    const fetchAquaInfo = async () => {
      setStatus(FetchStatus.Loading);
      const data = await AquaApi.getAquaInfo("1");
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
      const data = await FishApi.getConflicts();
      const species = await FishApi.getSpecies();
      const newConflictsList: string[] = [];

      for (let item of data) {
        let newConflict = `Konflikt między **${
          species.find((i) => i.id === item.speciesID)?.name
        }** a gatunkami **(`;

        for (let ee of item.conflicts) {
          newConflict += `${species.find((i) => i.id === ee)?.name}, `;
        }

        newConflict = newConflict.slice(0, -2);
        newConflict += `)**`;
        newConflictsList.push(newConflict);
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
      </div>
    </Loader>
  );
};

export default AquaPage;
