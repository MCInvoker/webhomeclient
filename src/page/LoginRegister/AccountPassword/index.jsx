import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from 'ahooks';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Input, message, Button } from 'antd';
import CryptoJS from 'crypto-js';

import DragToUnlock from '../../../components/DragToUnlock';
import { getUrlParams } from '../../../utils/utils';
import { getPages } from '../../../api/page';
import { login } from '../../../api/user';

const AccountPassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [isDrag, setIsDrag] = useState(false); // 登录时拖拽验证

    const handleSuccess = () => {
        setIsDrag(true);
    };

    const { run: getPagesFn } = useRequest(getPages, {
        manual: true,
        onSuccess: (res) => {
            const page_id = res.data[0].page_id;
            navigate(`/home?page_id=${page_id}`);
        },
    });

    const { run, loading } = useRequest(login, {
        debounceWait: 300,
        manual: true,
        onSuccess: (res) => {
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
        },
    });

    const handleusername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        if (loading) return;
        if (username === '') {
            message.error('请输入用户名！');
            return;
        }
        if (password === '') {
            message.error('请输入密码！');
            return;
        }
        if (!isDrag) {
            message.error('请向右拖动滑块完成校验！');
            return;
        }
        run({
            account: username,
            password,
        });
    };

    return (
        <>
            <Input
                placeholder="请输入账号"
                prefix={<UserOutlined />}
                style={{ marginTop: 40, marginBottom: 22 }}
                onChange={(e) => handleusername(e)}
                maxLength={16}
            />
            <Input.Password
                placeholder="请输入密码"
                maxLength={16}
                prefix={<KeyOutlined />}
                style={{ marginBottom: 22 }}
                onChange={(e) => handlePassword(e)}
            />
            <DragToUnlock
                onSuccess={handleSuccess}
                sliderContainerStyle={{
                    marginBottom: 22
                }}
            />
            <div style={{ margin: '14px 0 ' }}>
                <Button
                    type="primary"
                    style={{ width: '100%', height: 32 }}
                    onClick={handleLogin}
                    loading={loading}
                >
                    {loading ? '登录中...' : '登录'}
                </Button>
            </div>
        </>
    )
}

export default AccountPassword;
