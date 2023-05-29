import { useEffect, useState } from "react";
import Aquarium from "./components/aquarium";
import EmptyAquariumsList from "./components/empty-list";
import AddIcon from "@mui/icons-material/Add";
import { AquariumData } from "./models/aquarium.interface";
import AquariumListApi from "./aquarium-list-api.service";
import Loader from "../../../../components/loader/loader";
import { FetchStatus } from "../../../../utils/models/fetch-status";

const AquariumsList = () => {
  const [aquaData, setAquaData] = useState<AquariumData[]>([]);
  const [status, setStatus] = useState(FetchStatus.NotStarted);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(FetchStatus.Loading);

      try {
        const data = await AquariumListApi.getAquariumList();
        setAquaData(data);
        setStatus(FetchStatus.Loaded);
      } catch {}
    };

    fetchData();
  }, []);

  if (false) return <EmptyAquariumsList />;

  return (
    <Loader status={status}>
      <div className="m-5 grid grid-cols-1 gap-7 pb-5 md:grid-cols-2 2xl:grid-cols-4">
        {aquaData.map((item, index) => {
          return (
            <Aquarium
              imgID={item.imgID}
              id={item.id}
              name={item.name}
              fishNumber={item.fishNumber}
              key={index}
            />
          );
        })}

        <div className="group flex h-[130px] cursor-pointer select-none flex-row items-center justify-center rounded-3xl border-[4px] border-dashed border-neutral-400 hover:border-neutral-500">
          <div className="font-bold text-neutral-400 group-hover:text-neutral-500">
            Dodaj nowe akwarium
          </div>
        </div>
      </div>
      <button className="fixed bottom-[5%] right-[5%] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-sky-600 shadow-lg duration-100 hover:bg-sky-500">
        <AddIcon className="text-white" style={{ fontSize: "36px" }} />
      </button>
    </Loader>
  );
};

export default AquariumsList;
