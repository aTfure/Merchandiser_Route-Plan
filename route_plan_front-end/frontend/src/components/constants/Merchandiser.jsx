import { Tag } from "antd";
import React from "react";

export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "Outlets",
    key: "outlets",
    dataIndex: "outlets",
    render: (outlets) => (
      <>
        {outlets.map((outlet) => (
          <Tag color="blue" key={outlet}>
            {outlet}
          </Tag>
        ))}
      </>
    ),
  },
];
export const data = {
  totalElements: 3,
  content: [
    {
      id: 1,
      first_name: "Joe",
      last_name: "Doe",
      email: "joe.doe@example.com",
      phone_number: "123-456-7890",
      created: "2023-12-01",
      outlets: ["Outlet 1", "Outlet 2"],
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone_number: "987-654-3210",
      created: "2023-11-25",
      outlets: ["Outlet 3"],
    },
    {
      id: 3,
      first_name: "John",
      last_name: "Brown",
      email: "john.brown@example.com",
      phone_number: "456-789-0123",
      created: "2023-11-20",
      outlets: ["Outlet 1", "Outlet 4"],
    },
  ],
};
