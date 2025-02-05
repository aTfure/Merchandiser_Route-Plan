import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRouteByIdQuery } from "../../../redux/slices/routeSlice";
import { Button, Card, Result, Spin } from "antd";
import RouteForm from "./Form";

const EditRoute = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: route, isLoading, error } = useGetRouteByIdQuery(id);

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
        title="Failed to load route"
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

  if (!route) {
    return (
      <Result
        status="404"
        title="Route not found"
        subTitle="The route you are looking for does not exist or has been removed"
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
    <Card title={`${route.name}`}>
      <RouteForm
        mode="edit"
        initialValues={{
          ...route,
          outlet_ids: route.outlet_ids || [],
        }}
      />
    </Card>
  );
};

export default EditRoute;
