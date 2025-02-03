import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOutletByIdQuery } from "../../../redux/slices/outletSlice";
import { Button, Card, List, Result, Spin } from "antd";
import OutletForm from "./Form";

const EditOutlet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: outlet, isLoading, error } = useGetOutletByIdQuery(id);

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
        title="Failed to load outlet"
        subTitle={error.message || "Please try again later."}
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => navigate("/outlets")}
          >
            Back to List
          </Button>,
        ]}
      />
    );
  }

  if (!outlet) {
    return (
      <Result
        status="404"
        title="Outlet not found"
        subTitle="The Outlet you are looking for does not exist or has been removed"
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => navigate("/outlets")}
          >
            Back to List
          </Button>,
        ]}
      />
    );
  }

  return (
    <Card title={`${outlet.name} - ${outlet.location}`}>
      <OutletForm
        mode="edit"
        initialValues={{
          ...outlet,
          channel_type_id: outlet.channel_type_id,
        }}
      />
    </Card>
  );
};

export default EditOutlet;
