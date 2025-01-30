import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/slices/authApi";
import { Button, Card, Form, Input, message } from "antd";
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
      message.success("Login sucessful");
      navigate("/dashboard");
    } catch (err) {
      message.error(
        "Failed to login: " + (err.date?.message || "Unknown error")
      );
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="Login" className="w-full max-w-md">
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
          <div className="text-center">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
