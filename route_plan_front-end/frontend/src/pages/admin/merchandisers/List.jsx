import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/Merchandiser";
import {
  useBulkDeleteMerchandisersMutation,
  useDeleteMerchandiserMutation,
  useGetAllMerchandisersQuery,
} from "../../../redux/slices/merchandiserSlice";
import ActionMenu from "../../../components/action-menu/ActionMenu";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

function ViewMerchandisers() {
  const navigate = useNavigate();
  const { DataTable, currentPage, pageSize, selectedRowKeys } = useDataTable();
  const [deleteMerchandiser] = useDeleteMerchandiserMutation();

  const hasSelected = selectedRowKeys.length > 0;

  // View Action
  const additionalActions = [
    {
      key: "view",
      icon: <EyeOutlined />,
      text: "View Details",
      onclick: (id) => navigate(`/merchandisers/${id}/view`),
    },
  ];

  // Action column addes to base column
  const tableColumns = [
    ...constants.columns,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ActionMenu
          selectedRow={record}
          entityType="Merchandiser"
          onDelete={deleteMerchandiser}
          updateEntityPath="/merchandisers"
          additionalActions={additionalActions}
        />
      ),
    },
  ];

  const {
    data: merchandisers,
    isLoading,
    error,
  } = useGetAllMerchandisersQuery({
    page: currentPage,
    size: pageSize,
  });

  return (
    <div className="view-merchandisers">
      <Header addNewPath={"merchandisers/create"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable
          columns={tableColumns}
          dataSource={merchandisers}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default ViewMerchandisers;
