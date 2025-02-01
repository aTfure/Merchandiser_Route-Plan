import { Table } from "antd";
import React, { useState } from "react";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

function useDataTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("pagination:", pagination);
    setCurrentPage(pagination.current - 1);
    setPageSize(pagination.pageSize);
  };

  const DataTable = ({ columns, dataSource, rowKey = "id" }) => (
    <div className="data-table">
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource?.content || dataSource}
        onChange={handleTableChange}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
          current: currentPage + 1,
          total: dataSource?.totalElements,
          showTotal: (total, range) => {
            return `${range[0]} - ${range[1]} of ${total} items`;
          },
        }}
        bordered
        size="middle"
      />
    </div>
  );
  return {
    DataTable,
    selectedRowKeys,
    currentPage,
    pageSize,
    handleTableChange,
  };
}

export default useDataTable;
