import React, { useState } from 'react';

import { Segmented, Button } from 'antd';
import { createStyles } from 'antd-style';

import AccountPassword from './AccountPassword';
import PhoneLogin from './PhoneLogin';
import RegisterForm from './RegisterForm';
import loginImg from './login.jpg';

function LoginRegister () {
    const { styles } = useStyles();
    const [isRegister, setIsRegister] = useState(false);
    const [loginType, setLoginType] = useState('账号登录'); // 手机号登录、账号登录
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginBox}>
                <img src={loginImg} alt="" className={styles.loginImg} />
                {/* 登录 */}
                {!isRegister && (
                    <div
                        className={styles.loginRight}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div className={styles.loginTitle}>登录</div>
                            <Segmented
                                options={['账号登录', '手机号登录']}
                                className={styles.loginSegmented}
                                onChange={(value) => {
                                    setLoginType(value)
                                }}
                            />
                        </div>
                        {loginType === '账号登录' && (
                            <AccountPassword />
                        )}
                        {loginType === '手机号登录' && (
                            <PhoneLogin />
                        )}
                        <div>
                            没有账号？
                            <Button
                                size="small"
                                type="link"
                                onClick={() => setIsRegister(true)}
                                style={{
                                    fontSize: 12,
                                    padding: 0
                                }}
                            >去注册</Button>
                        </div>
                    </div>
                )}
                {/* 注册 */}
                {isRegister && (
                    <div
                        className={styles.loginRight}
                        style={{
                            paddingTop: 40
                        }}
                    >
                        <div className={styles.loginTitle}>注册</div>
                        <RegisterForm setIsRegister={setIsRegister} />
                        <div>
                            已有账号？
                            <Button
                                size="small"
                                type="link"
                                onClick={() => setIsRegister(false)}
                                style={{
                                    fontSize: 12,
                                    padding: 0
                                }}
                            >去登录</Button>
                        </div>
                    </div>
                )}
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
