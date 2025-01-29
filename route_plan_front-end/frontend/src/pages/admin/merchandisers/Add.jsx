import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
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
import React from "react";

function AddMerchandiser() {
  const [form] = Form.useForm();

  const handleSave = (values) => {
    console.log("onFinish", values);
    // Call Save API
  };

  const requiredFieldRule = [{ required: true, message: "Requied Field" }];

  const outletArray = [
    {
      id: 1,
      value: "Outlet A",
    },
    {
      id: 2,
      value: "Outlet B",
    },
    {
      id: 3,
      value: "Outlet C",
    },
  ];

  return (
    <Card title="Add Merchandiser" loading={false} className="add-merchandiser">
      <Row justify={"center"}>
        <Col span={12}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="merchandiser-form"
            onFinish={handleSave}
          >
            <Form.Item
              label="First Name"
              name="first_name"
              rules={requiredFieldRule}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={requiredFieldRule}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Invalid Email" },
                ...requiredFieldRule,
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={requiredFieldRule}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Outlets" name="outlets" rules={requiredFieldRule}>
              <Select mode="multiple" placeholder="Select Outlets">
                {outletArray.map((outlet) => (
                  <Option key={outlet.id} value={outlet.id}>
                    {outlet.value}
                  </Option>
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
            <Row justify="center">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}

export default AddMerchandiser;
