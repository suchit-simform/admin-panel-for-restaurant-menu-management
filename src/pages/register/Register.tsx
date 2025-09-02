import { Button, Checkbox, Flex, Form, Input, Select } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store";
import { login } from "src/store/features/authSlice";

const { Option } = Select;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    console.log("Received values of form: ", values);
    dispatch(login());
    navigate("/", { replace: true });
  };

  return (
    <Flex
      vertical
      align="stretch"
      style={{
        width: "100%",
        maxWidth: 600,
      }}
    >
      <Flex vertical align="flex-start" gap={8} style={{ marginBottom: 24 }}>
        <h1>Register</h1>
        <p>
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </Flex>
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        scrollToFirstError
        variant="outlined"
        initialValues={{ prefix: "91", role: "user" }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select role!" }]}>
          <Select placeholder="select your role">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I have read the <Link to="/agreement">agreement</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Register;
