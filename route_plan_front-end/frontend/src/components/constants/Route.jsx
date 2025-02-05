import { Tag } from "antd";
import React from "react";

export const columns = [
  {
    title: "Route Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Outlets",
    dataIndex: "route_outlets",
    key: "route_outlets",
    render: (routeOutlets) => (
      <>
        {routeOutlets && routeOutlets.length > 0 ? (
          routeOutlets.map((routeOutlet) => (
            <Tag color="blue" key={routeOutlet.outlet.id}>
              {routeOutlet.outlet.name}
            </Tag>
          ))
        ) : (
          <span>No outlets assigned</span>
        )}
      </>
    ),
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (createdAt) => new Date(createdAt).toLocaleString(),
  },
];
