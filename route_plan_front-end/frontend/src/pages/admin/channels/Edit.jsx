import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChannelTypeByIdQuery } from "../../../redux/slices/channelSlice";
import { Button, Card, Result, Spin } from "antd";
import ChannelForm from "./Form";

const EditChannel = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: channel, isLoading, error } = useGetChannelTypeByIdQuery(id);

  if (isLoading) {
    return (
      <Card style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </Card>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Failed to load channel"
        subTitle={error.message || "Please try again later"}
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => navigate("/channels")}
          >
            Back to List
          </Button>,
        ]}
      />
    );
  }

  if (!channel) {
    return (
      <Result
        status="404"
        title="Channel Type not fount"
        subTitle="The Channel Type you are looking for does not exist or has been removed"
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => navigate("/channels")}
          >
            Back to List
          </Button>,
        ]}
      />
    );
  }

  return (
    <Card title={`Edit Channel: ${channel.name}`}>
      <ChannelForm
        mode="edit"
        initialValues={{
          ...channel,
        }}
      />
    </Card>
  );
};

export default EditChannel;
