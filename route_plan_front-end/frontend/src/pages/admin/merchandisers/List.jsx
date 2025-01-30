import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/Merchandiser";
import {
  useBulkDeleteMerchandisersMutation,
  useGetAllMerchandisersQuery,
} from "../../../redux/slices/merchandiserSlice";
import { message } from "antd";

function ViewMerchandisers() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: merchandisers,
    isLoading,
    error,
  } = useGetAllMerchandisersQuery({
    page: currentPage,
    size: pageSize,
  });

  const [bulkDelete] = useBulkDeleteMerchandisersMutation();

  const handleBulkDelete = async (selectedIds) => {
    try {
      await bulkDelete(selectedIds).unwrap();
      message.success("Selected Merchandisers deleted successfully");
    } catch (err) {
      message.error("Failed to delete  merchandisers");
    }
  };
  console.log(merchandisers);

  const { DataTable, hasSelected, selectedRow, resetPagination } = useDataTable(
    {
      columns: constants.columns,
      dataSource: merchandisers,
      updateEntityPath: "update-merchandiser",
      loading: isLoading,
      onBulkDelete: handleBulkDelete,
    }
  );
  if (error) {
    message.error("Failed to fetch merchandisers");
  }
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
