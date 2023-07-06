import React from "react";
import { login } from "../../services/api/commonApi";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants/constants";
import { Form, Input, Button, notification } from "antd";
import Icon from "@ant-design/icons";
import "./Login.css";


const FormItem = Form.Item;

function Login(props) {
    const AntWrappedLoginForm = Form.create()(LoginForm);

    const handleLogin = () => {
        props.onLogin();
    };

    return (
        <div className="login-container">
            <h1 className="page-title">로그인</h1>
            <div className="login-content">
                <AntWrappedLoginForm onLogin={handleLogin} />
            </div>
        </div>
    );
}

function LoginForm(props) {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (event) => {
        event.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = { ...values };
                login(loginRequest)
                    .then((response) => {
                        localStorage.setItem(
                            ACCESS_TOKEN,
                            response.accessToken
                        );
                        props.onLogin();
                    })
                    .catch((error) => {
                        if (error.status === 401) {
                            notification.error({
                                message: "Webtoon",
                                description:
                                    "아이디 혹은 비밀번호가 일치하지 않습니다. 다시 시도해주세요.",
                            });
                        } else {
                            notification.error({
                                message: "Webtoon",
                                description:
                                    error.message || "다시 시도해주세요.",
                            });
                        }
                    });
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <FormItem>
                {getFieldDecorator("usernameOrEmail", {
                    rules: [
                        {
                            required: true,
                            message: "아이디 혹은 이메일을 입력해주세요.",
                        },
                    ],
                })(
                    <Input
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail"
                        placeholder="Username or Email"
                    />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator("password", {
                    rules: [
                        { required: true, message: "비밀번호를 입력해주세요." },
                    ],
                })(
                    <Input
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                )}
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-button"
                >
                    로그인
                </Button>
                또는 <Link to="/signup">회원가입</Link>
            </FormItem>
        </Form>
    );
}

export default Login;
