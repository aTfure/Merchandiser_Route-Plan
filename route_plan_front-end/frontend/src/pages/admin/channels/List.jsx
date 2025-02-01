import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import useActionMenu from "../../../components/action-menu/ActionMenu";
import * as constants from "../../../components/constants/ChannelType";
import { useGetAllChannelTypesQuery } from "../../../redux/slices/channelSlice";

function ViewChannels() {
  const { DataTable, currentPage, pageSize, selectedRowKeys } = useDataTable();

  const hasSelected = selectedRowKeys.length > 0;

  const tableColumns = [
    ...constants.columns,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <useActionMenu
          selectedRow={record}
          entityType="Channel"
          // onDelete={deleteChannel}
          updateEntityPath="channel/edit"
        />
      ),
    },
  ];

  const {
    data: channels,
    isLoading,
    error,
  } = useGetAllChannelTypesQuery({
    page: currentPage,
    size: pageSize,
  });

  if (error) {
    message.error("Failed to fetch channels");
  }

  return (
    <div className="view-channels">
      <Header addNewPath={"add-channel"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable
          columns={tableColumns}
          dataSource={channels}
          loading={isLoading}
          scroll={{ x: 1300 }}
        />
      </div>
    </div>
  );
}

export default ViewChannels;
