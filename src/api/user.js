import request from '../utils/request';

// 账号密码登录
const login = async (data) => {
    const res = await request.post('/api/user/password/login', data);
    return res;
};

// 手机验证码登录
const phoneLogin = async (data) => {
    const res = await request.post('/api/user/phone/login', data);
    return res;
};

// 校验手机号是否重复,校验手机号是否注册过，没有注册过返回{success: true,}否则{success: false,message: "手机号码重复!",}
const phoneCheck = async (data) => {
    const res = await request.post(`/api/user/phone/check/${data}`);
    return res;
};

// 校验账号是否重复
const accountCheck = async (data) => {
    const res = await request.post(`/api/user/account/check/${data}`);
    return res;
};

// 用户登录时获取手机验证码
const smsLogin = async (data) => {
    const res = await request.post('/api/sms/login', data);
    return res;
};

// 用户注册时获取手机验证码
const smsRegister = async (data) => {
    const res = await request.post('/api/sms/register', data);
    return res;
};

// 注册
const register = async (data) => {
    const res = await request.post('/api/user/register', data);
    return res;
};

export { login, phoneLogin, phoneCheck, smsLogin, smsRegister, register, accountCheck };
