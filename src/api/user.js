import request from '../utils/request';

// 账号密码登录
const login = async (data) => {
  const res = await request.post('/api/login', data);
  return res;
};

export { login };
