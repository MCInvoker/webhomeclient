import request from '../utils/request';

const addCategory = async (data, page_id) => {
  const res = await request.post(`/api/category/${page_id}`, data);
  return res;
};

const deleteCategory = async (category_id) => {
  const res = await request.delete(`/api/category/${category_id}`);
  return res;
};

const updateCategory = async (data, category_id) => {
  const res = await request.put(`/api/category/${category_id}`, data);
  return res;
};

export { addCategory, deleteCategory, updateCategory };
