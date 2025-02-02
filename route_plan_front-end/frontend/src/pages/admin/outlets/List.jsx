import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import useActionMenu from "../../../components/action-menu/ActionMenu";
import * as constants from "../../../components/constants/Outlet";
import {
  useBulkDeleteOutletsMutation,
  useDeleteOutletMutation,
  useGetAllOutletsQuery,
} from "../../../redux/slices/outletSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import ActionMenu from "../../../components/action-menu/ActionMenu";
function ShowOutlets() {
  const navigate = useNavigate();
  const { DataTable, currentPage, pageSize, selectedRowKeys } = useDataTable();
  const [deleteOutlet] = useDeleteOutletMutation();

  const hasSelected = selectedRowKeys.length > 0;

  // Action View
  const additionalActions = [
    {
      key: "view",
      icon: <EyeOutlined />,
      text: "View Details",
      onclick: (id) => navigate(`/outlets/${id}/view`),
    },
  ];

  // Action Column Added to Base Column

  const tableColumns = [
    ...constants.columns,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ActionMenu
          selectedRow={record}
          entityType="Outlet"
          onDelete={deleteOutlet}
          updateEntityPath="/outlets"
          additionalActions={additionalActions}
        />
      ),
    },
  ];

  const {
    data: outlets,
    isLoading,
    error,
  } = useGetAllOutletsQuery({
    page: currentPage,
    size: pageSize,
  });

  if (error) {
    message.error("Failed to fetch outlets");
  }
  return (
    <div className="view-outlets">
      <Header addNewPath={"outlets/create"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable
          columns={tableColumns}
          dataSource={outlets}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default ShowOutlets;
