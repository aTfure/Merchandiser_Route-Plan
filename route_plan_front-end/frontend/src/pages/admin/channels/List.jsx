import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/ChannelType";
import { useGetAllChannelsQuery } from "../../../redux/slices/channelSlice";

function ViewChannels() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: channels,
    isLoading,
    error,
  } = useGetAllChannelsQuery({
    page: currentPage,
    size: pageSize,
  });

  console.log(channels);

  const { DataTable, hasSelected, resetPagination } = useDataTable({
    columns: constants.columns,
    dataSource: channels,
    loading: isLoading,
    updateEntityPath: "update-channel",
  });

  if (error) {
    message.error("Failed to fetch channels");
  }

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
