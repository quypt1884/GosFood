import { Button, Checkbox, Col, Form, Input, notification, Row } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "store";
import { InitialStateType, register, reset } from "store/authSlice";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { users, isError, message, token }: InitialStateType = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error register",
        description: message
      });
    }

    if (token && users?.isAdmin === false) {
      notification.success({
        message: "Success login"
      });
    }
    dispatch(reset());
  }, [users]);
  function handleSubmit(values: any) {
    dispatch(register(values));
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="my-9 max-w-7xl mx-auto">
      <h1 className="flex justify-center text-2xl text-[#f16331]">Register</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
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
        <Row>
          <Col span={12}>
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
          <Col span={12}>
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
        <Row>
          <Col span={12}>
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
          <Col span={12}>
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

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox className="focus:border-[#f16331]">Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            className="text-[#f16331] border-[#f16331] hover:bg-[#f16331] hover:border-[#f16331]"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
