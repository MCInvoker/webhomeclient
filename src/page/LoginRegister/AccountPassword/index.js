import { UserOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import { useState, useRef } from 'react';
import './index.css';
import DragToUnlock from '../../../compenonts/DragToUnlock';
import classNames from 'classnames';
import { login } from '../../../api/user';
import { useRequest } from 'ahooks';

const AccountPassword = (props) => {
    const [isRememberPassword, setIsRememberPassword] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isDrag, setIsDrag] = useState(false)

    const { run, loading } = useRequest(login, {
        debounceWait: 300,
        manual: true,
        onSuccess: (e) => {
            console.log(e)
        }
    })

    const handleSuccess = () => {
        setIsDrag(true)
    }
    const handleRememberPassword = () => {
        setIsRememberPassword(!isRememberPassword)
    }
    const handleusername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        if (loading) return
        if (username === '') {
            message.error('请输入用户名！')
            return
        }
        if (password === '') {
            message.error('请输入密码！')
            return
        }
        if (!isDrag) {
            message.error('请拖动滑块！')
            return
        }
        run({
            username,
            password
        })
        console.log('login', username, password)
    }


    return (
        <div className='AccountPassword'>
            <div className='inputLi usernameInputLi'>
                <i className="iconfont icon-yonghuming inputLeftIcon"></i>
                <div className='inputContent'>
                    <div className='inputLabel'>用户名</div>
                    <input className='input usernameInput' maxLength={16} onChange={(e) => handleusername(e)} placeholder='请输入用户名'></input>
                </div>
            </div>
            <div className='inputLi passwordInputLi'>
                <i className="iconfont icon-lock inputLeftIcon"></i>
                <div className='inputContent'>
                    <div className='inputLabel'>密码</div>
                    <input className='input passwordInput' maxLength={16} onChange={(e) => handlePassword(e)} type='password' placeholder='请输入密码'></input>
                </div>
            </div>
            <DragToUnlock onSuccess={handleSuccess} />
            <div className='rfPassword'>
                <div className='rememberPassword' onClick={handleRememberPassword}>
                    {/* <i className="iconfont icon-chenggong rememberPasswordIcon"></i> */}
                    <i className={classNames({
                        "iconfont": true,
                        "icon-chenggong": true,
                        "rememberPasswordIcon": true,
                        "isRememberPassword": isRememberPassword,
                    })}></i>
                    记住密码
                </div>
                <div className='forgotPassword'>忘记密码？</div>
            </div>
            <button className='loginButton' onClick={handleLogin}>{loading ? '登录中...' : '登录'}</button>

        </div>
    )
}

export default AccountPassword;