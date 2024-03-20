import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from 'ahooks';
import { message } from 'antd';
import classNames from 'classnames';
import CryptoJS from 'crypto-js';
import './index.css';

import { getPages } from '../../../api/page';
import { login } from '../../../api/user';
import DragToUnlock from '../../../compenonts/DragToUnlock';
import { getUrlParams } from '../../../utils/utils';

function AccountPassword() {
  const navigate = useNavigate();
  const [isRememberPassword, setIsRememberPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDrag, setIsDrag] = useState(false);

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
          console.log(error)
          getPagesFn();
        }
      } else {
        getPagesFn();
      }
    },
  });

  const handleSuccess = () => {
    setIsDrag(true);
  };
  const handleRememberPassword = () => {
    setIsRememberPassword(!isRememberPassword);
  };
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
      message.error('请拖动滑块！');
      return;
    }
    run({
      account: username,
      password,
    });
  };

  return (
    <div className="AccountPassword">
      <div className="inputLi usernameInputLi">
        <i className="iconfont icon-yonghuming inputLeftIcon" />
        <div className="inputContent">
          <div className="inputLabel">用户名</div>
          <input
            className="input usernameInput"
            maxLength={16}
            onChange={(e) => handleusername(e)}
            placeholder="请输入用户名"
          />
        </div>
      </div>
      <div className="inputLi passwordInputLi">
        <i className="iconfont icon-lock inputLeftIcon" />
        <div className="inputContent">
          <div className="inputLabel">密码</div>
          <input
            className="input passwordInput"
            maxLength={16}
            onChange={(e) => handlePassword(e)}
            type="password"
            placeholder="请输入密码"
          />
        </div>
      </div>
      <DragToUnlock onSuccess={handleSuccess} />
      <div className="rfPassword">
        <div className="rememberPassword" onClick={handleRememberPassword}>
          <i
            className={classNames({
              iconfont: true,
              'icon-chenggong': true,
              rememberPasswordIcon: true,
              isRememberPassword,
            })}
          />
          记住密码
        </div>
        <div className="forgotPassword">忘记密码？</div>
      </div>
      <button type="submit" className="loginButton" onClick={handleLogin}>
        {loading ? '登录中...' : '登录'}
      </button>
    </div>
  );
}

export default AccountPassword;
