// Handles both Add and Edit of merchandisers
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Switch,
} from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  useCreateOutletMutation,
  useUpdateOutletMutation,
} from "../../../redux/slices/outletSlice";
import { useGetAllChannelTypesQuery } from "../../../redux/slices/channelSlice";

const OutletForm = ({ initialValues, mode = "add" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [createOutlet, { isLoading: isCreating }] = useCreateOutletMutation();
  const [updateOutlet, { isLoading: isUpdating }] = useUpdateOutletMutation();

  const {
    data: channels,
    isLoading: channelsLoading,
    error: channelsError,
  } = useGetAllChannelTypesQuery();

  console.log(channels);

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSave = async (values) => {
    try {
      if (mode === "edit") {
        await updateOutlet({ id: initialValues.id, ...values }).unwrap();
        message.success("Outlet updated successfully");
      } else {
        await createOutlet(values).unwrap();
        message.success("Outlet created successfully");
      }
      navigate("/outlets");
    } catch (err) {
      const errorMessage = err.data?.message || `Failed to ${mode} outlet`;
      message.error(errorMessage);
      console.error(err);
    }
  };

  const requireFieldRule = [{ required: true, message: "Required Field" }];
  const isLoading = isCreating || isUpdating;

  return (
    <Card
      title={`${mode === "edit" ? "Edit" : "Add"} Outlet`}
      loading={isLoading}
      className="outlet-form"
    >
      <Row justify={"center"}>
        <Col span={12}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="outlet-form"
            onFinish={handleSave}
          >
            <Form.Item label="Name" name="name" rules={requireFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={requireFieldRule}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Channel Type"
              name="channel_type_id"
              rules={requireFieldRule}
            >
              <Select
                placeholder={
                  channelsLoading
                    ? "Loading Channel Types..."
                    : "Select Channel Type"
                }
                loading={channelsLoading}
                disabled={channelsLoading || channelsError}
              >
                {channels?.map((channel) => (
                  <Select.Option key={channel.id} value={channel.id}>
                    {channel.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Active"
              name="active"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
            <Divider />
            <Row justify="center" gutter={16}>
              <Col>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  {mode === "edit" ? "Update" : "Save"}
                </Button>
              </Col>
              <Col>
                <Button onClick={() => navigate("/outlets")}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default OutletForm;
