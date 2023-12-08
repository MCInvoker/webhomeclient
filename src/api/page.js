import request from "../utils/request"

const getPage = async (page_id) => {
    try {
        const res = await request.get(`/api/page/${page_id}`)
        return res
    } catch (error) {
        console.error('请求失败:', error);
        return {
            config: ''
        }
    }
}

export {
    getPage,
}