import React, { useState } from 'react';

import { message } from 'antd';
import './index.css';
import classNames from 'classnames';
import { useRequest } from 'ahooks';

import DragToUnlock from '../../../compenonts/DragToUnlock';
import { login } from '../../../api/user';

function AccountPassword() {
  const [isRememberPassword, setIsRememberPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDrag, setIsDrag] = useState(false);

  const { run, loading } = useRequest(login, {
    debounceWait: 300,
    manual: true,
    onSuccess: () => {},
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
      username,
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
          {/* <i className="iconfont icon-chenggong rememberPasswordIcon"></i> */}
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
