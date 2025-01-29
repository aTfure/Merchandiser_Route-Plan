import React from "react";

export const columns = [
  {
    title: "Channel Type ID",
    dataIndex: "channel_type_id",
    key: "channel_type_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
];

export const data = {
  totalElements: 3,
  content: [
    {
      channel_type_id: 1,
      name: "Supermarket Small High Income",
    },
    {
      channel_type_id: 2,
      name: "Supermarket Mid-Income Medium (B)",
    },
    {
      channel_type_id: 3,
      name: "Independent Supermarkets Small",
    },
  ],
};
