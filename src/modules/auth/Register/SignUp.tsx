import { Button, Col, Form, Input, notification, Row } from "antd";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "store";
import { InitialStateType, register, reset } from "store/authSlice";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, isError, message, token }: InitialStateType = useSelector(
    (state: RootState) => state.auth
  );

  const getData = useCallback(() => {
    if (isError) {
      notification.error({
        message: "Error sign up",
        description: message
      });
    }

    if (token && users?.isAdmin === false) {
      notification.success({
        message: "Success login"
      });
    }
    dispatch(reset());
  }, [users, token, isError, message, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);
  function handleSubmit(values: any) {
    dispatch(register(values));
  }

  return (
    <div className="my-9 max-w-7xl mx-auto">
      <h1 className="flex justify-center text-2xl text-[#f16331]">Sign up</h1>
      <Form
        name="basic"
        initialValues={{}}
        onFinish={handleSubmit}
        autoComplete="on"
        layout="vertical"
        className="mt-3 w-1/2 mx-auto"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Email invalidate"
                },
                { required: true, message: "Please input your email!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                // {
                //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g,
                //   message: "Password invalidate"
                // },
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex justify-between">
          <Col span={11}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex justify-between">
          <Col span={11}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                  message: "Phone invalidate"
                },
                { required: true, message: "Please input your phone!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

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

export default SignUp;
