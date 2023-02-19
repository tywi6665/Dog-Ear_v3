import React from "react";
import { Layout, Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const Signup = () => {
  const [loginForm] = Form.useForm();
  const { Content } = Layout;
  const { Title, Text } = Typography;

  const onFinish = (values) => {
    if (
      values.username === "js.woodward@gmail.com" &&
      values.password === "read2day"
    ) {
      //   setCredentials(values);
    } else {
      //   onFinishFailed();
      loginForm.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    // setCredentials({});
  };

  return (
    <Layout id="layout" style={{ minHeight: "100%" }}>
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
          onFinish={(values) => onFinish(values)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="log-in-title">
            <Title
              style={{
                margin: "5px",
              }}
            >
              Dog-Ear
            </Title>
            <div className="dog-image">
              <img src="./static/graphics/dog.png" alt="Woof woof" />
            </div>
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text>
                Already have account? <Link to="/login">Login</Link>
              </Text>
              <Text italic type="secondary">
                Made by tywi
              </Text>
            </div>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Signup;
