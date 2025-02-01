import React from "react";
import { useParams } from "react-router-dom";
import { useGetMerchandiserByIdQuery } from "../../../redux/slices/merchandiserSlice";
import { Descriptions, Spin } from "antd";

const ViewMerchandisersDetails = () => {
  const { id } = useParams();
  const { data: merchandiser, isLoading } = useGetMerchandiserByIdQuery(id);

  if (isLoading) return <Spin size="large" />;

  return (
    <Descriptions title="Merchandiser Details" bordered>
      <Descriptions.Item label="Name">
        {merchandiser.full_name}
      </Descriptions.Item>
      <Descriptions.Item label="Email">{merchandiser.email}</Descriptions.Item>
      <Descriptions.Item label="Phone">
        {merchandiser.phone_number}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ViewMerchandisersDetails;
