import React, { useState, useEffect } from 'react';

import { Form, Input, Button, message, Space } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

import { smsRegister, register, phoneCheck, accountCheck } from '../../../api/user';

const RegisterForm = ({ setIsRegister }) => {
    const [form] = Form.useForm();
    const [countdown, setCountdown] = useState(0);
    const [isAccountCheck, setIsAccountCheck] = useState(true)
    const [isPhoneCheck, setIsPhoneCheck] = useState(true);
    const account = Form.useWatch('account', form);
    const phone = Form.useWatch('phone', form);

    const { run: registerFn } = useRequest(register, {
        manual: true,
        onSuccess: (res) => {
            if (res.success) {
                message.success('注册成功,前往登录');
                setIsRegister && setIsRegister(false)
            }
        },
    });

    const { run: accountCheckFn } = useRequest(accountCheck, {
        manual: true,
        onSuccess: (res) => {
            if (res.success) {
                setIsAccountCheck(true)
            } else {
                setIsAccountCheck(false)
            }
        },
    });

    const { run: phoneCheckFn, loading: phoneCheckLoading } = useRequest(phoneCheck, {
        manual: true,
        onSuccess: (res) => {
            if (res.success) {
                setIsPhoneCheck(true)
            } else {
                setIsPhoneCheck(false)
            }
        },
    });

    // 发送短信验证码
    const { run: smsRegisterFn, loading: smsRegisterLoading } = useRequest(smsRegister, {
        manual: true,
        onSuccess: (res) => {
            if (res.success) {
                message.success('已发送短信验证码')
                setCountdown(60);
            }
        },
    });

    // 倒计时结束后重置倒计时
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const checkAccountExists = () => {
        accountCheckFn(account)
    }
    const checkPhoneExists = () => {
        if (phone && phone.length === 11) {
            phoneCheckFn(phone)
        }
    }

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    // 获取验证码
    const handleSmsRegister = () => {
        if (!phone || phone.length !== 11) {
            message.error('请输入正确的手机号')
            return
        }
        if (!isPhoneCheck) {
            message.error('该手机号已经注册，请直接登录')
            return
        }
        smsRegisterFn({ phone })
    }

    const onFinish = async (values) => {
        registerFn({
            account: values.account,
            password: values.password,
            phone: values.phone,
            verification_code: values.verificationCode,
        })
    };

    return (
        <Form
            style={{ marginTop: 24 }}
            form={form}
            name="register"
            onFinish={onFinish}
            wrapperCol={{ span: 24 }}
        >
            <Form.Item
                name="account"
                rules={[
                    { required: true, message: '请输入账号' },
                    { min: 6, message: '账号长度不能少于6位' },
                    { max: 20, message: '账号长度不能超过20位' },
                ]}
                style={{ marginBottom: 16 }}
                onBlur={checkAccountExists} // 在失去焦点时触发校验
                extra={isAccountCheck ? null : '该账号已被注册'}
            >
                <Input
                    placeholder='请输入账号'
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: '请输入密码' },
                    { min: 6, message: '密码长度不能少于6位' },
                    { max: 20, message: '密码长度不能超过20位' },
                ]}
                style={{ marginBottom: 16 }}
            >
                <Input.Password
                    placeholder='请输入密码'
                />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    { required: true, message: '请再次输入密码' },
                    ({ getFieldValue }) => ({
                        validator (_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('两次输入的密码不一致');
                        },
                    }),
                ]}
                style={{ marginBottom: 16 }}
            >
                <Input.Password
                    placeholder='请再次输入密码'
                />
            </Form.Item>

            <Form.Item
                name="phone"
                rules={[
                    { required: true, message: '请输入手机号' },
                    { len: 11, message: '请输入正确的手机号' },
                ]}
                style={{ marginBottom: 16 }}
                onBlur={checkPhoneExists} // 在失去焦点时触发校验
                extra={isPhoneCheck ? null : '该手机号已被注册,可直接登录'}
            >
                <Input
                    placeholder='请输入手机号'
                    maxLength={11}
                />
            </Form.Item>

            <Form.Item
                name="verificationCode"
                rules={[{ required: true, message: '请输入手机验证码' }, { len: 6, message: '请输入6位验证码' },]}
                style={{ marginBottom: 16 }}
            >
                <Space direction="horizontal" size={6}>
                    <Input
                        prefix={<KeyOutlined />}
                        placeholder="请输入6位验证码"
                        maxLength={6}
                    />
                    <Button
                        style={{ width: 72, fontSize: 12, textAlign: 'center', padding: '4px 0' }}
                        onClick={() => handleSmsRegister()}
                        loading={smsRegisterLoading || phoneCheckLoading}
                        disabled={smsRegisterLoading || countdown > 0 || phoneCheckLoading}
                    >
                        {(smsRegisterLoading || phoneCheckLoading) ? '' : countdown > 0 ? countdown : '获取验证码'}
                    </Button>
                </Space>
            </Form.Item>

            <Form.Item
                style={{ marginBottom: 12 }}
                wrapperCol={{ span: 24 }}
            >
                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
