import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./LoginActions";
import { Layout, Button, Form, Input, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginForm] = Form.useForm();
  const { Content } = Layout;
  const { Title, Text } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (userData) => {
    console.log(userData);
    messageApi.destroy();
    login(userData, "/catalog", navigate, dispatch, displayMessage);
    // logout(navigate, dispatch, displayMessage);
    //   loginForm.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("login failed");
  };

  const displayMessage = (message, type) => {
    messageApi.open({
      type: type,
      content: message,
      duration: 10,
    });
  };

  return (
    <Layout id="layout" style={{ minHeight: "100%" }}>
      {contextHolder}
      <Content
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          name="basic"
          form={loginForm}
          style={{
            background: "#fff",
            padding: "15px",
            border: "1px solid rgba(5, 5, 5, 0.06)",
            borderRadius: "8px",
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(userData) => onFinish(userData)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="log-in-title">
            <Title
              level={3}
              style={{
                margin: "5px",
              }}
            >
              Please Log In
            </Title>
          </div>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" className="btn-active">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 0 }}
            wrapperCol={{
              offset: 1,
              span: 24,
            }}
          >
            {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
            <Text>
              Need an account? <Link to="/signup">Sign Up</Link>
            </Text>
            {/* <Text italic type="secondary">
                Made by tywi
              </Text>
            </div> */}
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
