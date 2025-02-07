import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/Route";
import {
  useDeleteRouteMutation,
  useGetAllRoutesQuery,
  useResendRouteEmailMutation,
} from "../../../redux/slices/routeSlice";
import ActionMenu from "../../../components/action-menu/ActionMenu";
import { useNavigate } from "react-router-dom";
import { ApiFilled, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";

function ViewRoutes() {
  const navigate = useNavigate();
  const { DataTable, currentPage, pageSize, selectedRowKeys } = useDataTable();
  const [deleteRoute] = useDeleteRouteMutation();
  const hasSelected = selectedRowKeys.length > 0;
  const [resendRouteEmail] = useResendRouteEmailMutation();

  // View Action
  const additionalActions = [
    {
      key: "view",
      icon: <EyeOutlined />,
      text: "View Details",
      onclick: (id) => navigate(`/routes/${id}/view`),
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
          entityType="Route"
          onDelete={deleteRoute}
          updateEntityPath="/routes"
          additionalActions={additionalActions}
          onResendEmail={async (row) => {
            try {
              await resendRouteEmail(row.id).unwrap();
              message.success("Notification email resent successfully");
            } catch (error) {
              message.error("Failed to resend email notification");
            }
          }}
        />
      ),
    },
  ];
  const {
    data: routes,
    isLoading,
    error,
  } = useGetAllRoutesQuery({
    page: currentPage,
    size: pageSize,
  });
  console.log("Fetched routes data:", routes);

  return (
    <div className="view-routes">
      {console.log("DataSource for DataTable:", routes)}

      <Header addNewPath={"routes/create"} hasSelected={hasSelected} />
      <div className="table-container">
        <DataTable
          columns={tableColumns}
          dataSource={routes}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default ViewRoutes;
