import request from '../utils/request';

// 获取ststoken
const getStsToken = async () => {
    const res = await request.get('/api/sts');
    return res;
};

export { getStsToken };
