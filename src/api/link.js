import request from '../utils/request';

const addLink = async (data, category_id) => {
  const res = await request.post(`/api/link/${category_id}`, data);
  return res;
};

const deleteLink = async (link_id) => {
  const res = await request.delete(`/api/link/${link_id}`);
  return res;
};

const updateLink = async (data, link_id) => {
  const res = await request.put(`/api/link/${link_id}`, data);
  return res;
};

const getConfig = async () => {
  try {
    const res = await request.get('/config');
    return res;
  } catch (error) {
    return {
      config: '',
    };
  }
};

export { addLink, deleteLink, updateLink, getConfig };
