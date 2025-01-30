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
    title: "Outlets",
    key: "outlets",
    dataIndex: "assigned_outlets",
    render: (assignedOutlets) => (
      <>
        {assignedOutlets && assignedOutlets.length > 0 ? (
          assignedOutlets.map((outlet) => (
            <Tag color="blue" key={outlet.id}>
              {outlet.name}
            </Tag>
          ))
        ) : (
          <span>No outlets assigned</span>
        )}
      </>
    ),
  },
];
