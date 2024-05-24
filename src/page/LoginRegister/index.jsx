import React from 'react';

import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Segmented, Input, Checkbox, Button } from 'antd';
import { createStyles } from 'antd-style';

import loginImg from './login.jpg';

function LoginRegister() {
  const { styles } = useStyles();
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <img src={loginImg} alt="" className={styles.loginImg} />
        <div className={styles.loginRight}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className={styles.loginTitle}>登录</div>
            <Segmented options={['账号登录', '手机号登录']} className={styles.loginSegmented} />
          </div>
          <Input
            placeholder="请输入账号"
            prefix={<UserOutlined />}
            style={{ marginTop: 40, marginBottom: 22 }}
          />
          <Input.Password
            placeholder="请输入密码"
            prefix={<KeyOutlined />}
            style={{ marginBottom: 22 }}
          />
          <Input placeholder="这里是滚动验证" style={{ marginBottom: 28 }} />
          <Checkbox style={{ fontSize: 12 }}>记住账号密码</Checkbox>
          <div style={{ margin: '14px 0 ' }}>
            <Button type="primary" style={{ width: '100%', height: 32 }}>
              登录
            </Button>
          </div>
          <div>
            没有账号？<span style={{ color: '#1E67FA' }}>去注册</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = createStyles(({ css }) => ({
  loginPage: css`
    min-width: 100wh;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      90deg,
      #edf6ff -1%,
      #f2fcff 22%,
      #fcf5ff 41%,
      #fffbf5 61%,
      #fff6f6 78%,
      #eefff7 100%
    );
  `,
  loginBox: css`
    width: 828px;
    height: 440px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    background-color: #fff;
  `,
  loginImg: css`
    width: 475px;
    height: 100%;
  `,
  loginRight: css`
    flex: 1;
    padding: 61px 56px 0px;
    .ant-input-outlined {
      border-color: #ededee;
    }
    .ant-input {
      font-size: 12px !important;
    }
  `,
  loginTitle: css`
    height: 33px;
    line-height: 33px;
    font-size: 24px;
    font-weight: 500;
  `,
  loginSegmented: css`
    height: 33px;
    font-size: 12px;
  `,
}));

export default LoginRegister;
