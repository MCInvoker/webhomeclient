// addCategory category
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { addCategory, updateCategory } from "../../../api/category";

const AddCategory = (props) => {
    const { open, setAddOpen, editCategotyInfo, page_id, getPageInfo } = props
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false)
    const isAdd = useMemo(() => {
        return editCategotyInfo === null
    }, [editCategotyInfo])

    useEffect(() => {
        if (editCategotyInfo !== null) {
            form.setFieldsValue({
                ...editCategotyInfo
            })
        }
    }, [editCategotyInfo, form])

    const handleCreateCategory = async (values) => {
        setConfirmLoading(true)
        if (editCategotyInfo !== null) {
            const res = await updateCategory({ ...values }, editCategotyInfo.category_id)
            if (res.success) {
                message.success('保存成功!')
            }
        } else {
            const res = await addCategory({ ...values }, page_id)
            if (res.success) {
                message.success('新增成功!')
            }
        }
        setConfirmLoading(false)
        getPageInfo()
        setAddOpen(false)
    };

    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                handleCreateCategory(values);
            })
            .catch((err) => {
                console.error('Validation failed:', err);
            })
    };

    return (
        <Modal
            open={open}
            title={isAdd ? "新增分类" : "编辑分类"}
            okText={isAdd ? "新增" : "保存"}
            cancelText="取消"
            onCancel={() => setAddOpen(false)}
            onOk={handleCreate}
            confirmLoading={confirmLoading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="category_name"
                    label="名称"
                    rules={[{ required: true, message: '请输入分类名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="描述"
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCategory;