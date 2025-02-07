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
import {
  useCreateMerchandiserMutation,
  useUpdateMerchandiserMutation,
} from "../../../redux/slices/merchandiserSlice";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useGetAllRoutesQuery } from "../../../redux/slices/routeSlice";

const MerchandiserForm = ({ initialValues, mode = "add" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [createMerchandiser, { isLoading: isCreating }] =
    useCreateMerchandiserMutation();
  const [updateMerchandiser, { isLoading: isUpdating }] =
    useUpdateMerchandiserMutation();

  const {
    data: routes,
    isLoading: routesLoading,
    error: routesError,
  } = useGetAllRoutesQuery();

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSave = async (values) => {
    try {
      if (mode === "edit") {
        await updateMerchandiser({ id: initialValues.id, ...values }).unwrap();
        message.success("Merchandiser updated successfully");
      } else {
        await createMerchandiser(values).unwrap();
        message.success("Merchandiser created successfully");
      }
      navigate("/merchandisers");
    } catch (err) {
      const errorMessage =
        err.data?.message || `Failed to ${mode} merchandiser`;
      message.error(errorMessage);
      console.error(err);
    }
  };

  const requiredFieldRule = [{ required: true, message: "Required Field" }];

  const isLoading = isCreating || isUpdating;

  return (
    <Card
      title={`${mode === "edit" ? "Edit" : "Add"} Merchandiser`}
      loading={isLoading}
      className="merchandiser-form"
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
            <Form.Item label="Route" name="route_ids">
              <Select
                mode="multiple"
                placeholder={
                  routesLoading ? "Loading Outlets..." : "Select Outlets"
                }
                loading={routesLoading}
                disabled={routesLoading || routesError}
              >
                {routes?.map((route) => (
                  <Select.Option key={route.id} value={route.id}>
                    {route.name}
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
                <Button onClick={() => navigate("/merchandisers")}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default MerchandiserForm;
