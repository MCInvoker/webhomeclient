import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { addLink, updateLink } from "../../../api/link";

const AddLink = (props) => {
    const { open, setAddOpen, editLinkInfo, getPageInfo, category_id } = props
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false)

    const isAdd = useMemo(() => {
        return editLinkInfo === null
    }, [editLinkInfo])

    useEffect(() => {
        console.log(editLinkInfo)
        if (editLinkInfo !== null) {
            form.setFieldsValue({
                ...editLinkInfo
            })
        }
    }, [editLinkInfo, form])

    const handleCreateLink = async (values) => {
        setConfirmLoading(true)
        if (editLinkInfo !== null) {
            const res = await updateLink({ ...values }, editLinkInfo.link_id)
            if (res.success) {
                message.success('保存成功!')
            }
        } else {
            const res = await addLink({ ...values }, category_id)
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
                handleCreateLink(values);
            })
            .catch((err) => {
                console.error('Validation failed:', err);
            });
    };

    return (
        <Modal
            open={open}
            title={isAdd ? '添加链接' : '编辑链接'}
            okText={isAdd ? "新增" : "保存"}
            cancelText="取消"
            onCancel={() => setAddOpen(false)}
            onOk={handleCreate}
            confirmLoading={confirmLoading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="link_name"
                    label="名称"
                    rules={[{ required: true, message: '请输入链接名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="url"
                    label="地址"
                    rules={[{ required: true, message: '请输入链接网络地址!' }]}
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

export default AddLink;