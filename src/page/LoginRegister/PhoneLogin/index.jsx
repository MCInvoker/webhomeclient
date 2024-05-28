import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from 'ahooks';
import { KeyOutlined, UserOutlined, } from '@ant-design/icons';
import { Input, message, Button, Space } from 'antd';
import CryptoJS from 'crypto-js';

import DragToUnlock from '../../../components/DragToUnlock';
import { getUrlParams } from '../../../utils/utils';
import { getPages } from '../../../api/page';
import { phoneLogin, phoneCheck, smsLogin } from '../../../api/user';

const PhoneLogin = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState(''); // 手机号
    const [verification_code, setVerification_code] = useState(''); // 验证码
    const [isDrag, setIsDrag] = useState(false); // 登录时拖拽验证
    const [isPhoneCheck, setIsPhoneCheck] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleSuccess = () => {
        setIsDrag(true);
    };

    // 验证手机号是否注册过
    const { run: phoneCheckFn, loading: phoneCheckLoading } = useRequest(phoneCheck, {
        manual: true,
        onBefore: () => {
            setIsPhoneCheck(false)
        },
        onSuccess: (res) => {
            if (res.success) {
                setIsPhoneCheck(true)
            }
        },
    });

    // 发送短信验证码
    const { run: smsLoginFn, loading: smsLoginLoading } = useRequest(smsLogin, {
        manual: true,
        onSuccess: (res) => {
            if (res.success) {
                message.success('已发送短信验证码')
                setCountdown(60);
            }
        },
    });

    // 获取页面，跳转主页
    const { run: getPagesFn } = useRequest(getPages, {
        manual: true,
        onSuccess: (res) => {
            const page_id = res.data[0].page_id;
            navigate(`/home?page_id=${page_id}`);
        },
    });

    // 手机验证码登录
    const { run: phoneLoginFn, loading: phoneLoginLoading } = useRequest(phoneLogin, {
        manual: true,
        onSuccess: (res) => {
            if (res.success) {
                localStorage.setItem('token', res.token);
                const path = getUrlParams('path');
                if (path) {
                    try {
                        const decryptedBytes = CryptoJS.AES.decrypt(path, 'path');
                        const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
                        window.location.href = decryptedString;
                    } catch (error) {
                        getPagesFn();
                    }
                } else {
                    getPagesFn();
                }
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

    const handlePhone = (e) => {
        const phoneValue = e.target.value
        setPhone(phoneValue);
        if (phoneValue.length === 11) {
            phoneCheckFn(phoneValue)
        }
    };

    const handleCode = (e) => {
        setVerification_code(e.target.value);
    };

    // 获取验证码
    const handleSmsLogin = () => {
        if (phone.length !== 11) {
            message.error('请输入正确的手机号')
            return
        }
        if (!isDrag) {
            message.error('请拖动滑块通过人机校验')
            return
        }
        if (isPhoneCheck) {
            message.error('该手机号没有注册，请先注册')
            return
        }
        smsLoginFn({ phone })
    }

    // 登录
    const handleLogin = () => {
        if (phone.length !== 11) {
            message.error('请输入正确的手机号')
            return
        }
        if (!isDrag) {
            message.error('请拖动滑块通过人机校验')
            return
        }
        if (isPhoneCheck) {
            message.error('该手机号没有注册，请先注册')
            return
        }
        if (verification_code.length !== 6) {
            message.error('请输入6位手机验证码')
            return
        }
        phoneLoginFn({ phone, verification_code })
    }

    return (
        <>
            <Input
                placeholder="请输入手机号"
                prefix={<UserOutlined />}
                style={{ marginTop: 40, marginBottom: 22 }}
                onChange={(e) => handlePhone(e)}
                maxLength={11}
            />
            <DragToUnlock
                onSuccess={handleSuccess}
                sliderContainerStyle={{
                    marginBottom: 22
                }}
            />
            <Space direction="horizontal" size={6}>
                <Input
                    prefix={<KeyOutlined />}
                    placeholder="请输入6位验证码"
                    onChange={(e) => handleCode(e)}
                    maxLength={6}
                />
                <Button
                    style={{ width: 72, fontSize: 12, textAlign: 'center', padding: '4px 0' }}
                    onClick={() => handleSmsLogin()}
                    loading={smsLoginLoading || phoneCheckLoading}
                    disabled={smsLoginLoading || countdown > 0 || phoneCheckLoading}
                >
                    {(smsLoginLoading || phoneCheckLoading) ? '' : countdown > 0 ? countdown : '获取验证码'}
                </Button>
            </Space>
            <div style={{ margin: '22px 0 14px' }}>
                <Button
                    type="primary"
                    style={{ width: '100%', height: 32 }}
                    onClick={handleLogin}
                    loading={phoneLoginLoading}
                >
                    {phoneLoginLoading ? '登录中...' : '登录'}
                </Button>
            </div>
        </>
    )
}

export default PhoneLogin;