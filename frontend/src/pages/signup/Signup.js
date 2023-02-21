import React from "react";
import { Layout, Button, Form, Input, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signupNewUser } from "./SignupAction";

const Signup = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [loginForm] = Form.useForm();
  const { Content } = Layout;
  const { Title, Text } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  // const usernameError = useSelector((state) => state.signup.usernameError);
  // const passwordError = useSelector((state) => state.signup.passwordError);

  // useEffect(() => {
  //   if (usernameError.length) {
  //     displayMessage(usernameError, "error");
  //   }
  //   if (passwordError.length) {
  //     passwordError.forEach((error) => displayMessage(error, "error"));
  //   }
  // }, [usernameError, passwordError]);

  const onFinish = (userData) => {
    console.log(userData);
    messageApi.destroy();
    signupNewUser(userData, dispatch, displayMessage);
    //   loginForm.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("signup failed");
  };

  const displayMessage = (message, type) => {
    messageApi.open({
      type: type,
      content: message,
      duration: 0,
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
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
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
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
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
              Already have account? <Link to="/login">Login</Link>
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

export default Signup;
