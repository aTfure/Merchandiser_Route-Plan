import React, { useState } from "react";
import Header from "../../../components/header/Header";
import useDataTable from "../../../components/data-table/DataTable";
import * as constants from "../../../components/constants/Route";
import {
  useDeleteRouteMutation,
  useGetAllRoutesQuery,
  useResendEmailMutation,
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
  const [resendEmail] = useResendEmailMutation();

  // View Action
  const additionalActions = [
    {
      key: "view",
      icon: <EyeOutlined />,
      text: "View Details",
      onclick: (record) => navigate(`/routes/${record.id}/view`),
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
          onResendEmail={async (record) => {
            if (record.route_schedules && record.route_schedules.length > 0) {
              const routeSchedule = record.route_schedules[0];
              try {
                await resendEmail(routeSchedule.id).unwrap();
                message.success("Email resent successfully");
              } catch (error) {
                message.error("Failed to resend email");
              }
            } else {
              message.error("No schedule found");
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
    refresh,
  } = useGetAllRoutesQuery({
    page: currentPage,
    size: pageSize,
  });

  if (isLoading) {
    return <div>Loading routes...</div>;
  }

  if (error) {
    console.error("Error fetching routes:", error);
    return <div>Error loading routes. Please try again later.</div>;
  }

  return (
    <div className="view-routes">
      <Header addNewPath="routes/create" hasSelected={hasSelected} />
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
