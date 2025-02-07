import { Tag } from "antd";
import React from "react";

export const columns = [
  {
    title: "Full Name",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Route",
    key: "routes",
    dataIndex: "routes",
    render: (routes) => (
      <>
        {routes && routes.length > 0 ? (
          routes.map((route) => (
            <Tag color="blue" key={route.id}>
              {route.name}
            </Tag>
          ))
        ) : (
          <span>No route assigned</span>
        )}
      </>
    ),
  },
];
