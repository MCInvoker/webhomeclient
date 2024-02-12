import request from '../utils/request';

// 获取页面下所有分类和链接
const getPage = async (page_id) => {
    try {
        const res = await request.get(`/api/page/${page_id}`);
        return res;
    } catch (error) {
        console.error('请求失败:', error);
        return {
            config: '',
        };
    }
};

const addPage = async (data) => {
    const res = await request.post(`/api/page`, data)
    return res
}

const deletePage = async (page_id) => {
    const res = await request.delete(`/api/page/${page_id}`)
    return res
}

const updatePage = async (data, page_id) => {
    const res = await request.put(`/api/page/${page_id}`, data)
    return res
}

const getPages = async () => {
    const res = await request.get(`/api/page`)
    return res
}

export {
    getPage,
    addPage,
    deletePage,
    updatePage,
    getPages
};
