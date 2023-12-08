import request from "../utils/request"

const addLink = async (data, category_id) => {
    const res = await request.post(`/api/link/${category_id}`, data)
    return res
}

const deleteLink = async (link_id) => {
    const res = await request.delete(`/api/link/${link_id}`)
    return res
}

const getConfig = async () => {
    try {
        const res = await request.get('/config')
        return res
    } catch (error) {
        console.error('请求失败:', error);
        return {
            config: ''
        }
    }
}

export {
    addLink,
    deleteLink,
    getConfig,
}