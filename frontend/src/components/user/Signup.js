import React, { useState } from "react";
import {
    signup,
    checkUsernameAvailability,
    checkEmailAvailability,
} from "../../services/api/commonApi";
import "./Signup.css";
import { Link } from "react-router-dom";
import {
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from "../../constants/constants";
import { Form, Input, Button, notification } from "antd";

const FormItem = Form.Item;

const Signup = (props) => {
    const [name, setName] = useState({ value: "" });
    const [username, setUsername] = useState({ value: "" });
    const [email, setEmail] = useState({ value: "" });
    const [password, setPassword] = useState({ value: "" });

    const handleInputChange = (event, validationFun) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        if (inputName === "name") {
            setName({
                value: inputValue,
                ...validationFun(inputValue),
            });
        } else if (inputName === "username") {
            setUsername({
                value: inputValue,
                ...validationFun(inputValue),
            });
        } else if (inputName === "email") {
            setEmail({
                value: inputValue,
                ...validationFun(inputValue),
            });
        } else if (inputName === "password") {
            setPassword({
                value: inputValue,
                ...validationFun(inputValue),
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const signupRequest = {
            name: name.value,
            email: email.value,
            username: username.value,
            password: password.value,
        };
        signup(signupRequest)
            .then((response) => {
                notification.success({
                    message: "Webtoon",
                    description:
                        "성공적으로 회원가입되었습니다. 로그인을 해주세요.",
                });
                props.history.push("/login");
            })
            .catch((error) => {
                notification.error({
                    message: "Webtoon",
                    description: error.message || "다시 시도해주세요.",
                });
            });
    };

    const isFormInvalid = () => {
        return !(
            name.validateStatus === "success" &&
            username.validateStatus === "success" &&
            email.validateStatus === "success" &&
            password.validateStatus === "success"
        );
    };

    const validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: "error",
                errorMsg: `너무 짧습니다. 최소 ${NAME_MIN_LENGTH} 글자 이상 입력해주세요.`,
            };
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: "error",
                errorMsg: `너무 깁니다. 최대 ${NAME_MAX_LENGTH} 글자 이하로 입력해주세요.`,
            };
        } else {
            return {
                validateStatus: "success",
                errorMsg: null,
            };
        }
    };

    const validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: "error",
                errorMsg: "Email는 비워둘 수 없습니다.",
            };
        }

        const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: "error",
                errorMsg: "유효한 Email이 아닙니다.",
            };
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: "error",
                errorMsg: `너무 깁니다. 최대 ${EMAIL_MAX_LENGTH} 이하로 입력해주세요.`,
            };
        }

        return {
            validateStatus: null,
            errorMsg: null,
        };
    };

    const validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: "error",
                errorMsg: `너무 짧습니다. 최소 ${USERNAME_MIN_LENGTH} 글자 이상 입력해주세요.`,
            };
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: "error",
                errorMsg: `너무 깁니다. 최대 ${USERNAME_MAX_LENGTH} 글자 이하로 입력해주세요.`,
            };
        } else {
            return {
                validateStatus: null,
                errorMsg: null,
            };
        }
    };

    const validateUsernameAvailability = () => {
        const usernameValue = username.value;
        const usernameValidation = validateUsername(usernameValue);

        if (usernameValidation.validateStatus === "error") {
            setUsername({
                value: usernameValue,
                ...usernameValidation,
            });
            return;
        }

        setUsername({
            value: usernameValue,
            validateStatus: "validating",
            errorMsg: null,
        });

        checkUsernameAvailability(usernameValue)
            .then((response) => {
                if (response.available) {
                    setUsername({
                        value: usernameValue,
                        validateStatus: "success",
                        errorMsg: null,
                    });
                } else {
                    setUsername({
                        value: usernameValue,
                        validateStatus: "error",
                        errorMsg: "이미 존재하는 Username 입니다.",
                    });
                }
            })
            .catch((error) => {
                setUsername({
                    value: usernameValue,
                    validateStatus: "success",
                    errorMsg: null,
                });
            });
    };

    const validateEmailAvailability = () => {
        const emailValue = email.value;
        const emailValidation = validateEmail(emailValue);

        if (emailValidation.validateStatus === "error") {
            setEmail({
                value: emailValue,
                ...emailValidation,
            });
            return;
        }

        setEmail({
            value: emailValue,
            validateStatus: "validating",
            errorMsg: null,
        });

        checkEmailAvailability(emailValue)
            .then((response) => {
                if (response.available) {
                    setEmail({
                        value: emailValue,
                        validateStatus: "success",
                        errorMsg: null,
                    });
                } else {
                    setEmail({
                        value: emailValue,
                        validateStatus: "error",
                        errorMsg: "이미 존재하는 Email 입니다. ",
                    });
                }
            })
            .catch((error) => {
                setEmail({
                    value: emailValue,
                    validateStatus: "success",
                    errorMsg: null,
                });
            });
    };

    const validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: "error",
                errorMsg: `너무 짧습니다. 최소 ${PASSWORD_MIN_LENGTH} 글자 이상 입력해주세요.`,
            };
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: "error",
                errorMsg: `너무 깁니다. 최대 ${PASSWORD_MAX_LENGTH} 글자 이하로 입력해주세요.`,
            };
        } else {
            return {
                validateStatus: "success",
                errorMsg: null,
            };
        }
    };

    return (
        <div className="signup-container">
            <h1 className="page-title">Sign Up</h1>
            <div className="signup-content">
                <Form onSubmit={handleSubmit} className="signup-form">
                    <FormItem
                        label="Full Name"
                        validateStatus={name.validateStatus}
                        help={name.errorMsg}
                    >
                        <Input
                            size="large"
                            name="name"
                            autoComplete="off"
                            placeholder="Your full name"
                            value={name.value}
                            onChange={(event) =>
                                handleInputChange(event, validateName)
                            }
                        />
                    </FormItem>
                    <FormItem
                        label="Username"
                        hasFeedback
                        validateStatus={username.validateStatus}
                        help={username.errorMsg}
                    >
                        <Input
                            size="large"
                            name="username"
                            autoComplete="off"
                            placeholder="A unique username"
                            value={username.value}
                            onBlur={validateUsernameAvailability}
                            onChange={(event) =>
                                handleInputChange(event, validateUsername)
                            }
                        />
                    </FormItem>
                    <FormItem
                        label="Email"
                        hasFeedback
                        validateStatus={email.validateStatus}
                        help={email.errorMsg}
                    >
                        <Input
                            size="large"
                            name="email"
                            type="email"
                            autoComplete="off"
                            placeholder="Your email"
                            value={email.value}
                            onBlur={validateEmailAvailability}
                            onChange={(event) =>
                                handleInputChange(event, validateEmail)
                            }
                        />
                    </FormItem>
                    <FormItem
                        label="Password"
                        validateStatus={password.validateStatus}
                        help={password.errorMsg}
                    >
                        <Input
                            size="large"
                            name="password"
                            type="password"
                            autoComplete="off"
                            placeholder="최소 6 글자 이상 입력해주세요."
                            value={password.value}
                            onChange={(event) =>
                                handleInputChange(event, validatePassword)
                            }
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="signup-form-button"
                            disabled={isFormInvalid()}
                        >
                            가입하기
                        </Button>
                        이미 가입하셨나요? <Link to="/login">로그인</Link>
                    </FormItem>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
