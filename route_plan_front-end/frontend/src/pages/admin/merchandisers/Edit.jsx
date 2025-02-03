import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMerchandiserByIdQuery } from "../../../redux/slices/merchandiserSlice";
import { Button, Card, Result, Spin } from "antd";
import MerchandiserForm from "./Form";

const EditMerchandiser = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: merchandiser,
    isLoading,
    error,
  } = useGetMerchandiserByIdQuery(id);

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
        title="Failed to load merchandiser"
        subTitle={error.message || "Please try again later."}
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => navigate("/merchandisers")}
          >
            Back to List
          </Button>,
        ]}
      />
    );
  }

  if (!merchandiser) {
    return (
      <Result
        status="404"
        title="Merchandiser not found"
        subTitle="The merchandiser you are looking for does not exist or has been removed"
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => navigate("/merchandisers")}
          >
            Back to List
          </Button>,
        ]}
      />
    );
  }

  return (
    <Card title={`${merchandiser.first_name} ${merchandiser.last_name}`}>
      <MerchandiserForm
        mode="edit"
        initialValues={{
          ...merchandiser,
          outlet_ids: merchandiser.outlet_ids || [],
        }}
      />
    </Card>
  );
};

export default EditMerchandiser;
