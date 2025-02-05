import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  useCreateRouteMutation,
  useUpdateRouteMutation,
} from "../../../redux/slices/routeSlice";
import { useGetAllOutletsQuery } from "../../../redux/slices/outletSlice";

const RouteForm = ({ initialValues, mode = "add" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [createRoute, { isLoading: isCreating }] = useCreateRouteMutation();
  const [updateRoute, { isLoading: isUpdating }] = useUpdateRouteMutation();

  const {
    data: outlets,
    isLoading: outletsLoading,
    error: outletsError,
  } = useGetAllOutletsQuery();

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSave = async (values) => {
    try {
      if (mode === "edit") {
        await updateRoute({ id: initialValues.id, ...values }).unwrap();
        message.success("Route updated successfully");
      } else {
        await createRoute(values).unwrap();
        message.success("Route created successfully");
      }
      navigate("/routes");
    } catch (err) {
      const errorMessage = err.data?.message || `Failed to ${mode} route`;
      message.error(errorMessage);
      console.error(err);
    }
  };

  const requiredFieldRule = [{ required: true, message: "Required Field" }];

  const isLoading = isCreating || isUpdating;

  return (
    <Card
      title={`${mode === "edit" ? "Edit" : "Add"} Route`}
      loading={isLoading}
      className="route-form"
    >
      <Row justify="center">
        <Col span={12}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="route-form"
            onFinish={handleSave}
          >
            <Form.Item label="Route Name" name="name" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Outlets"
              name="outlet_ids"
              rules={requiredFieldRule}
            >
              <Select
                mode="multiple"
                placeholder={
                  outletsLoading ? "Loading Outlets..." : "Select Outlets"
                }
                loading={outletsLoading}
                disabled={outletsLoading || outletsError}
              >
                {outlets?.map((outlet) => (
                  <Select.Option key={outlet.id} value={outlet.id}>
                    {outlet.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Divider />
            <Row justify="center" gutter={16}>
              <Col>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  {mode === "edit" ? "Update" : "Save"}
                </Button>
              </Col>
              <Col>
                <Button onClick={() => navigate("/routes")}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default RouteForm;
