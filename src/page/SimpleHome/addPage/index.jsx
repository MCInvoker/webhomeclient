import React, { useState, useMemo, useEffect } from 'react';

import { Modal, Form, Input, message } from 'antd';

import { addPage, updatePage } from '../../../api/page';

function AddPage (props) {
    const { open, setAddOpen, editPageInfo, getPagesFn } = props;
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const isAdd = useMemo(() => {
        return editPageInfo === null;
    }, [editPageInfo]);

    useEffect(() => {
        if (editPageInfo !== null) {
            form.setFieldsValue({
                ...editPageInfo,
            });
        }
    }, [editPageInfo, form]);

    const handleCreateLink = async (values) => {
        setConfirmLoading(true);
        if (editPageInfo !== null) {
            const res = await updatePage({ ...values }, editPageInfo.page_id);
            if (res.success) {
                message.success('保存成功!');
            }
        } else {
            const res = await addPage({ ...values });
            if (res.success) {
                message.success('新增成功!');
            }
        }
        setConfirmLoading(false);
        getPagesFn();
        setAddOpen(false);
    };

    const handleCreate = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                handleCreateLink(values);
            })
            .catch(() => { });
    };

    return (
        <Modal
            open={open}
            title={isAdd ? '添加页面' : '编辑页面'}
            okText={isAdd ? '新增' : '保存'}
            cancelText="取消"
            onCancel={() => setAddOpen(false)}
            onOk={handleCreate}
            confirmLoading={confirmLoading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="page_name"
                    label="名称"
                    rules={[{ required: true, message: '请输入页面名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="描述">
                    <Input.TextArea maxLength={100} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddPage;
