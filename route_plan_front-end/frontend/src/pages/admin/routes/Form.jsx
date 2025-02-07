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
import {
  useCreateRouteMutation,
  useUpdateRouteMutation,
} from "../../../redux/slices/routeSlice";
import { useGetAllOutletsQuery } from "../../../redux/slices/outletSlice";
import { useGetAllMerchandisersQuery } from "../../../redux/slices/merchandiserSlice";
import { MailOutlined } from "@ant-design/icons";

const RouteForm = ({ initialValues, mode = "add" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  const [createRoute, { isLoading: isCreating }] = useCreateRouteMutation();
  const [updateRoute, { isLoading: isUpdating }] = useUpdateRouteMutation();

  const { data: outlets, isLoading: outletsLoading } = useGetAllOutletsQuery();
  const { data: merchandisers } = useGetAllMerchandisersQuery();

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue({
        ...initialValues,
        merchandiser_id: initialValues.merchandiser?.id,
      });
    }
  }, [initialValues, form]);

  const handleSave = async (values) => {
    try {
      let response;
      const payload = {
        ...values,
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
      setCurrentRoute(response.data);
      setShowEmailModal(true);
    } catch (err) {
      const errorMessage = err.data?.message || `Failed to ${mode} route`;
      message.error(errorMessage);
      console.error(err);
    }
  };

  const handleEmailSend = async () => {
    try {
      // Add API call to resend email if needed
      message.success("Notification email sent successfully");
      setShowEmailModal(false);
      navigate("/routes");
    } catch (err) {
      message.error("Failed to send email notification");
    }
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

              <Form.Item label="Merchandiser" name="merchandiser_id">
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
        title="Route Assignment Notification"
        visible={showEmailModal}
        onCancel={() => setShowEmailModal(false)}
        footer={[
          <Button key="back" onClick={() => setShowEmailModal(false)}>
            Close
          </Button>,
          <Button
            key="send"
            type="primary"
            icon={<MailOutlined />}
            onClick={handleEmailSend}
          >
            Send Notification
          </Button>,
        ]}
      >
        {currentRoute?.merchandiser && (
          <div className="email-preview">
            <p>
              <strong>To:</strong> {currentRoute.merchandiser.email}
            </p>
            <p>
              <strong>Subject:</strong> New Route Assignment:{" "}
              {currentRoute.name}
            </p>
            <div className="email-content">
              <p>Hello {currentRoute.merchandiser.full_name},</p>
              <p>You have been assigned to a new route:</p>
              <ul>
                <li>
                  <strong>Route Name:</strong> {currentRoute.name}
                </li>
                <li>
                  <strong>Number of Outlets:</strong>{" "}
                  {currentRoute.outlets_count}
                </li>
                <li>
                  <strong>Assigned Date:</strong>{" "}
                  {new Date().toLocaleDateString()}
                </li>
              </ul>
              <p>An ICS calendar invite has been attached to this email.</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RouteForm;
