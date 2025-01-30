import { Button, Card, Form, Input, message, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import React from "react";
import { useGetAllChannelsQuery } from "../../../redux/slices/channelSlice";

const AddOutlet = () => {
  const [form] = Form.useForm();

  const {
    data: channels,
    isLoading: channelsLoading,
    error: channelsError,
  } = useGetAllChannelsQuery();

  console.log(channels);

  const handleSave = (values) => {
    console.log("Saved Outlet", values);
  };

  const requireFieldRule = [{ required: true, message: "Required Field" }];

  return (
    <Card title="Add Outlet" className="add-outlet">
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item label="Name" name="name" rules={requireFieldRule}>
          <Input />
        </Form.Item>
        <Form.Item label="Location" name="location" rules={requireFieldRule}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Channel Type"
          name="channel_type"
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
        <Row justify="center">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default AddOutlet;
