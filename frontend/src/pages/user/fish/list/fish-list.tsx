import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../../../components/loader/loader";
import { FetchStatus } from "../../../../utils/models/fetch-status";
import { Link } from "react-router-dom";
import FishButton from "./components/fish-button";
import FishListApi from "./fish-list-api.service";
import NewFishButton from "./components/new-fish-button";

const FishList = () => {
  const [status, setStatus] = useState(FetchStatus.NotStarted);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(FetchStatus.Loading);

      try {
        const data = await FishListApi.getFishList();
        // setAquaData(data);
        setStatus(FetchStatus.Loaded);
      } catch {}
    };

    fetchData();
  }, []);

  return (
    <Loader status={status}>
      <div>
        <div>Akwarium przy kominku</div>
        <div className="m-5 grid grid-cols-1 gap-7 pb-5 md:grid-cols-2 2xl:grid-cols-4">
          <FishButton name={"Andrzej"} species={"Gupik"} aquaImg={"9"} />

          <FishButton name={"Karolina"} species={"Sum"} aquaImg={"9"} />
          <FishButton name={"Karolina"} species={"Sum"} aquaImg={"9"} />
          <FishButton name={"Karolina"} species={"Sum"} aquaImg={"9"} />
          <FishButton
            name={"Po co nazywać ryby?"}
            species={"Karaś"}
            aquaImg={"9"}
          />

          <NewFishButton />
        </div>
      </div>

      <Link to="new">
        <button className="fixed bottom-[5%] right-[5%] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-sky-600 shadow-lg duration-100 hover:bg-sky-500">
          <AddIcon className="text-white" style={{ fontSize: "36px" }} />
        </button>
      </Link>
    </Loader>
  );
};

export default FishList;
