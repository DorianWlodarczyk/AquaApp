import React from "react";
import { FetchStatus } from "../../utils/models/fetch-status";
import Spinner from "./spinners/spinner";

interface props {
  children: React.ReactNode;
  status: FetchStatus;
}

const Loader = ({ children, status }: props) => {
  return (
    <div className="h-full">
      {status === FetchStatus.Loading && (
        <div className="flex h-full items-center justify-center">
          {<Spinner />}
        </div>
      )}

      {status === FetchStatus.Loaded && <div>{children}</div>}

      {status === FetchStatus.Error && <div>Error</div>}
    </div>
  );
};

export default Loader;
