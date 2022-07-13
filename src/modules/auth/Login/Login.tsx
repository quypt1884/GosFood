import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, notification, Row } from "antd";
import { FC, useEffect } from "react";

import { AppDispatch, RootState } from "store";
import { InitialStateType, login, reset } from "store/authSlice";

const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, isError, message, token }: InitialStateType = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error login",
        description: message
      });
    }

    if (token && users?.isAdmin === true) {
      notification.success({
        message: "Success login admin"
      });
    }

    if (token && users?.isAdmin === false) {
      notification.success({
        message: "Success login client"
      });
    }
    dispatch(reset());
  }, [users, token, dispatch]);
  function handleSubmit(values: any) {
    dispatch(login(values));
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="mx-auto my-0 max-w-7xl h-full">
      <h1 className="flex justify-center text-2xl text-[#f16331]">Sign in</h1>
      <Form
        name="basic"
        initialValues={{}}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        layout="vertical"
        className="my-9 w-1/3 mx-auto"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Email invalidate"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Row className="flex justify-center">
            <Button
              type="primary"
              className="text-[#f16331] border-[#f16331] hover:bg-[#f16331] hover:border-[#f16331]"
              htmlType="submit"
            >
              Submit
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
