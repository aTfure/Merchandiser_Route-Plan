import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Switch,
} from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateChannelTypeMutation,
  useUpdateChannelTypeMutation,
} from "../../../redux/slices/channelSlice";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const ChannelForm = ({ initialValues, mode = "add" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [createChannelType, { isLoading: isCreating }] =
    useCreateChannelTypeMutation();
  const [updateChannelType, { isLoading: isUpdating }] =
    useUpdateChannelTypeMutation();

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSave = async (values) => {
    try {
      if (mode === "edit") {
        await updateChannelType({ id: initialValues.id, ...values }).unwrap();
        message.success("Channel Type updated successfully");
      } else {
        await createChannelType(values).unwrap();
        message.success("Channel Type created successfully");
      }
      navigate("/channels");
    } catch (err) {
      const errorMessage =
        err.data?.message || `Failed to ${mode} channel type`;
      message.error(errorMessage);
      console.error(err);
    }
  };

  const requiredFieldRule = [{ required: true, message: "Required Field" }];
  const isLoading = isCreating || isUpdating;

  return (
    <Card
      title={`${mode === "edit" ? "Edit" : "Add"} Channel`}
      loading={isLoading}
      className="channel-form"
    >
      <Row justify={"center"}>
        <Col span={12}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="channel-form"
            onFinish={handleSave}
          >
            <Form.Item
              label="Channel Name"
              name="name"
              rules={requiredFieldRule}
            >
              <Input />
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
                <Button onClick={() => navigate("/channels")}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default ChannelForm;
