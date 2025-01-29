import React from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/Outlet";
function ShowOutlets() {
  const { DataTable, hasSelected, currentPage, pageSize, resetPagination } =
    useDataTable({
      columns: constants.columns,
      dataSource: constants.data,
      updateEntityPath: "update-outlet",
    });
  return (
    <div className="view-outlets">
      <Header addNewPath={"add-outlet"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable />
      </div>
    </div>
  );
}

export default ShowOutlets;
