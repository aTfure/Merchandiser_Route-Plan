import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/slices/authApi";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { setCredentials } from "../../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const result = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(
        setCredentials({
          user: result.user,
          token: result.token,
          refreshToken: result.refresh_token,
        })
      );
      message.success("Login successful");
      navigate("/");
    } catch (err) {
      message.error(
        "Failed to login: " + (err.data?.message || "Unknown error")
      );
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card title="Login" className="login-form">
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid Email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
