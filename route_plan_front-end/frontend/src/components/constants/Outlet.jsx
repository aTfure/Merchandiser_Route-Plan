import React from "react";

export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Channel Type",
    dataIndex: "channel_type",
    key: "channel_type",
  },
];

export const data = {
  totalElements: 3,
  content: [
    {
      id: 1,
      name: "Magunas Supermarket",
      location: "Roasters, Thika Road",
      channel_type: "Independent Supermarkets Small",
    },
    {
      id: 2,
      name: "Naivas",
      location: "Kitenge Road, Kitengela",
      channel_type: "Supermarket Small High Income",
    },
    {
      id: 3,
      name: "Quick Mart",
      location: "Kilimani Road, Kileleshwa",
      channel_type: "Supermarket Mid-Income Medium (B)",
    },
  ],
};
