import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/Outlet";
import { useGetAllOutletsQuery } from "../../../redux/slices/outletSlice";
import { message } from "antd";
function ShowOutlets() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: outlets,
    isLoading,
    error,
  } = useGetAllOutletsQuery({
    page: currentPage,
    size: pageSize,
  });

  console.log(outlets);

  const { DataTable, hasSelected, resetPagination } = useDataTable({
    columns: constants.columns,
    dataSource: outlets,
    loading: isLoading,
    updateEntityPath: "update-outlet",
  });

  if (error) {
    message.error("Failed to fetch outlets");
  }
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
