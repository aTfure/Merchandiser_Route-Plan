import { Button, Card, Form, Input, message, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import React from "react";

const AddOutlet = () => {
  const [form] = Form.useForm();

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
          <Select placeholder="Select Channel Type">
            {/* Replace options woth API Data */}
            <Option value={1}>Independent Supermarket</Option>
            <Option value={2}>Independent Supermarket</Option>
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
