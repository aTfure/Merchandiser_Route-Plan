import React, { useEffect, useState } from "react";
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
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import {
  useCreateRouteMutation,
  useUpdateRouteMutation,
} from "../../../redux/slices/routeSlice";
import { useGetAllOutletsQuery } from "../../../redux/slices/outletSlice";
import { useGetAllMerchandisersQuery } from "../../../redux/slices/merchandiserSlice";
import RouteScheduleForm from "./route-schedule/RouteScheduleForm";

const RouteForm = ({ initialValues, mode = "add" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  const [createRoute, { isLoading: isCreating }] = useCreateRouteMutation();
  const [updateRoute, { isLoading: isUpdating }] = useUpdateRouteMutation();

  const { data: outlets, isLoading: outletsLoading } = useGetAllOutletsQuery();
  const { data: merchandisers } = useGetAllMerchandisersQuery();

  useEffect(() => {
    if (initialValues) {
      const formValues = {
        ...initialValues,
        merchandiser_id: initialValues.merchandiser?.id,
        outlet_ids:
          initialValues.route_outlets?.map((ro) => ro.outlet.id) || [],
      };
      form.setFieldsValue(formValues);
    }
  }, [initialValues, form]);

  const handleSave = async (values) => {
    try {
      let response;
      const payload = {
        name: values.name,
        outlet_ids: values.outlet_ids || [],
        merchandiser_id: values.merchandiser_id,
      };

      if (mode === "edit") {
        response = await updateRoute({
          id: initialValues.id,
          ...payload,
        }).unwrap();
      } else {
        response = await createRoute(payload).unwrap();
      }

      message.success(
        `Route ${mode === "edit" ? "updated" : "created"} successfully`
      );
      setCurrentRoute(response);
      setShowScheduleModal(true);
    } catch (err) {
      const errorMessage = err.data?.message || `Failed to ${mode} route`;
      message.error(errorMessage);
      console.error(err);
    }
  };

  const handleScheduleComplete = () => {
    setShowScheduleModal(false);
    navigate("/routes");
  };

  const requiredFieldRule = [{ required: true, message: "Required Field" }];
  const isLoading = isCreating || isUpdating;

  return (
    <>
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
              <Form.Item
                label="Route Name"
                name="name"
                rules={requiredFieldRule}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Merchandiser"
                name="merchandiser_id"
                rules={requiredFieldRule}
              >
                <Select
                  placeholder="Select Merchandiser"
                  allowClear
                  options={merchandisers?.map((m) => ({
                    label: m.full_name,
                    value: m.id,
                  }))}
                />
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

      <Modal
        title="Schedule Route"
        open={showScheduleModal}
        onCancel={() => handleScheduleComplete()}
        footer={null}
        width={800}
      >
        <RouteScheduleForm
          route={currentRoute}
          onComplete={handleScheduleComplete}
        />
      </Modal>
    </>
  );
};

export default RouteForm;
