import './index.css'
import AccountPassword from './AccountPassword';
import loginhome from '../../image/long.svg'
import classNames from 'classnames';
import { useState } from 'react';


const LoginRegister = (props) => {
    const [loginMethod, setLoginMethod] = useState('AccountPassword') // MobileCode WeChatQR
    return (
        <div className="login">
            <div className='loginCenter'>
                <div className='logo'>
                    webhome
                </div>
                <div className='bottom'>
                    <div className='left'>
                        <img src={loginhome} alt=""></img>
                    </div>
                    <div className='right'>
                        <div className='welcome'>{`Welcome Back :)`}</div>
                        {loginMethod === 'AccountPassword' && <AccountPassword />}

                        <div className='loginList'>
                            <div
                                className={classNames({
                                    'loginLi': true,
                                    'loginLiActive': loginMethod === 'AccountPassword'
                                })}
                                onClick={() => setLoginMethod('AccountPassword')}
                            >账号密码</div>
                            <div
                                className={classNames({
                                    'loginLi': true,
                                    'loginLiActive': loginMethod === 'MobileCode'
                                })}
                                onClick={() => setLoginMethod('MobileCode')}
                            >手机验证码</div>
                            <div
                                className={classNames({
                                    'loginLi': true,
                                    'loginLiActive': loginMethod === 'WeChatQR'
                                })}
                                onClick={() => setLoginMethod('WeChatQR')}
                            >微信扫码</div>
                        </div>
                        <div className='registerBox'>
                            <span className='register'>没有账号？立即注册</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister;