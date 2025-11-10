import { Button, Checkbox, Flex, Form, Input, Select, type FormProps } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAbilityContext } from "src/lib/ability/ability.context";
import { handleMockUserAuthentication } from "src/lib/helpers/auth.helpers";
import { useAppDispatch } from "src/store";
import { handleLogin } from "src/store/features/authSlice";
import type { Role } from "src/types/common";
import { handleLogout } from "../../store/features/authSlice";

const { Option } = Select;

type FieldType = {
  email: string;
  password: string;
  role: Role;
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setAbility } = useAbilityContext();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    try {
      // handle login logic here, e.g., call an API to verify credentials
      const { authToken, currentUser, currentUserAbility } = handleMockUserAuthentication(values);
      dispatch(
        handleLogin({
          authToken,
          currentUser,
        }),
      );
      setAbility(currentUserAbility);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      dispatch(handleLogout());
    }
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
        <h1>Login</h1>
        <p>
          Don&apos;t have an account? <Link to="/auth/register">Register</Link>
        </p>
      </Flex>
      <Form
        form={form}
        name="login"
        layout="vertical"
        scrollToFirstError
        variant="outlined"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
        <Form.Item name="role" label="Role" rules={[{ message: "Please select role!" }]}>
          <Select placeholder="select your role">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/auth/forgot-password">Forgot password</Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
