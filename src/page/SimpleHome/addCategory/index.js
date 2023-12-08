// addCategory category
import React from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';

const AddCategory = (props) => {
    const { open, onCreate, onCancel } = props
    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })
            .catch((err) => {
                console.error('Validation failed:', err);
            });
    };

    return (
        <Modal
            open={open}
            title="添加分类"
            okText="添加"
            cancelText="取消"
            onCancel={onCancel}
            onOk={handleCreate}
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