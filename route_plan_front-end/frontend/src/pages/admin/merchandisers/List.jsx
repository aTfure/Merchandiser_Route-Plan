import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/Merchandiser";

function ViewMerchandisers() {
  const { DataTable, hasSelected, currentPage, pageSize, resetPagination } =
    useDataTable({
      columns: constants.columns,
      dataSource: constants.data,
      updateEntityPath: "update-merchandiser",
    });
  return (
    <div className="view-merchandisers">
      <Header addNewPath={"add-merchandiser"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable />
      </div>
    </div>
  );
}

export default ViewMerchandisers;
