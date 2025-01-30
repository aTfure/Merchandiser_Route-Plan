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
import { useNavigate } from "react-router-dom";
import { useCreateMerchandiserMutation } from "../../../redux/slices/merchandiserSlice";
import { useGetAllOutletsQuery } from "../../../redux/slices/outletSlice";

function AddMerchandiser() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createMerchandiser, { isLoading }] = useCreateMerchandiserMutation();
  const {
    data: outlets,
    isLoading: outletsLoading,
    error: outletsError,
  } = useGetAllOutletsQuery();

  const handleSave = async (values) => {
    try {
      await createMerchandiser(values).unwrap();
      message.success("Merchandiser created successfully");
      navigate("/merchandisers");
    } catch (err) {
      message.error("Failed to create merchandiser");
    }
    console.log("onFinish", values);
    // Call Save API
  };

  const requiredFieldRule = [{ required: true, message: "Requied Field" }];

  return (
    <Card
      title="Add Merchandiser"
      loading={isLoading}
      className="add-merchandiser"
    >
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
