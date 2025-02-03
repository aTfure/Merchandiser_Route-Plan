import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import useActionMenu from "../../../components/action-menu/ActionMenu";
import * as constants from "../../../components/constants/ChannelType";
import {
  useDeleteChannelTypeMutation,
  useGetAllChannelTypesQuery,
} from "../../../redux/slices/channelSlice";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import ActionMenu from "../../../components/action-menu/ActionMenu";

function ViewChannels() {
  const navigate = useNavigate();
  const { DataTable, currentPage, pageSize, selectedRowKeys } = useDataTable();
  const [deleteChannel] = useDeleteChannelTypeMutation();

  const hasSelected = selectedRowKeys.length > 0;

  // View Action
  const additionalActions = [
    {
      key: "view",
      icon: <EyeOutlined />,
      text: "View Details",
      onclick: (id) => navigate(`/channels/${id}/view`),
    },
  ];

  const tableColumns = [
    ...constants.columns,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ActionMenu
          selectedRow={record}
          entityType="Channel"
          onDelete={deleteChannel}
          updateEntityPath="/channels"
          additionalActions={additionalActions}
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
      <Header addNewPath={"channels/create"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable
          columns={tableColumns}
          dataSource={channels}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default ViewChannels;
