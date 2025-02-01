import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import useActionMenu from "../../../components/action-menu/ActionMenu";
import * as constants from "../../../components/constants/Outlet";
import { useGetAllOutletsQuery } from "../../../redux/slices/outletSlice";
import { message } from "antd";
function ShowOutlets() {
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
          entityType="Outlet"
          // onDelete={deleteOutlet}
          updateEntityPath="outlet/edit"
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

  console.log(outlets);

  if (error) {
    message.error("Failed to fetch outlets");
  }
  return (
    <div className="view-outlets">
      <Header addNewPath={"add-outlet"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable
          columns={tableColumns}
          dataSource={outlets}
          loading={isLoading}
          scroll={{ x: 1300 }}
        />
      </div>
    </div>
  );
}

export default ShowOutlets;
