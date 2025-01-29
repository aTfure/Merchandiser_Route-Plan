import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/ChannelType";

function ViewChannels() {
  const { DataTable, hasSelected, currentPage, pageSize, resetPagination } =
    useDataTable({
      columns: constants.columns,
      dataSource: constants.data,
      updateEntityPath: "update-channel",
    });
  return (
    <div className="view-channels">
      <Header addNewPath={"add-channel"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable />
      </div>
    </div>
  );
}

export default ViewChannels;
