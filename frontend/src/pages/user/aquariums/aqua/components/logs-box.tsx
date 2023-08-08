import React from "react";
import WidgetBox from "../../../../../components/widget-box/widget-box";
import { Color } from "../../../../../components/widget-box/icon-box/icon-box";
import BookIcon from "@mui/icons-material/Book";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AquaHistory } from "../../../../../utils/models/aquarium/aqua-history";

const columns: GridColDef[] = [
  { field: "time", headerName: "Czas", width: 150 },
  { field: "text", headerName: "Treść", width: 500 },
];

interface props {
  aquaHistory: AquaHistory[];
}

const LogsBox = ({ aquaHistory }: props) => {
  return (
    <WidgetBox
      className="mt-8 px-8"
      icon={<BookIcon />}
      color={Color.PURPLE}
      title="Historia zmian"
    >
      <DataGrid
        rows={aquaHistory}
        columns={columns}
        rowCount={5}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </WidgetBox>
  );
};

export default LogsBox;
