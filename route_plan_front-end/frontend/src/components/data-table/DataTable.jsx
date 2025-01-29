import { Table } from "antd";
import React, { useState } from "react";
import useActionMenu from "../action-menu/ActionMenu";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

function useDataTable({ columns, dataSource, updateEntityPath }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [actionColumnView] = useActionMenu({ selectedRow, updateEntityPath });

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: (selected) => {
      setSelectedRowKeys(selected);
    },
  };

  const updatedColumns = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: () => actionColumnView,
    },
  ];

  const handleSingleDelete = () => {
    console.log("handleSingleDelete, selected:", selectedRow);
  };
  const resetPagination = () => {
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  };
  const handleTableChange = (pagination) => {
    console.log("pagination:", pagination);
    setCurrentPage(pagination.current - 1);
  };

  const DataTable = () => (
    <div className="data-table">
      <Table
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={updatedColumns}
        dataSource={dataSource?.content}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedRow(record);
            },
          };
        }}
        onChange={handleTableChange}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
          current: currentPage + 1,
          total: dataSource?.totalElements,
          showTotal: (total, range) => {
            return `${range[0]} - ${range[1]} of ${total} items`;
          },
        }}
      />
    </div>
  );
  return {
    DataTable,
    hasSelected,
    selectedRow,
    selectedRowKeys,
    currentPage,
    pageSize,
    resetPagination,
  };
}

export default useDataTable;
