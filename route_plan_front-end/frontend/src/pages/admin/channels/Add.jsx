import { Button, Card, Form, Input, message, Row } from "antd";
import React from "react";

const AddChannel = () => {
  const [form] = Form.useForm();

  const handleSave = (values) => {
    console.log("Saved Channel:", values);
  };

  const requiredFieldRule = [{ required: true, message: "Required Field" }];

  return (
    <Card title="Add Channel" className="add-channel">
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item label="Channel Name" name="name" rules={requiredFieldRule}>
          <Input />
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

export default AddChannel;
