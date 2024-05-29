import React, { useEffect, useMemo } from 'react';

import { Form, Input, Modal, Select, message } from 'antd';
import { useRequest } from 'ahooks';

import { addLink, updateLink } from '../../../api/link';

function AddLink (props) {
    const { open, setAddOpen, editLinkInfo, getPageInfo, category_id, categories, page_id } = props;
    const [form] = Form.useForm();
    const { run: addLinkFn, loading: addLoading } = useRequest(addLink, {
        manual: true,
        onSuccess: () => {
            message.success('新增成功!');
            setAddOpen(false);
            getPageInfo();
            form.resetFields();
        },
    });
    const { run: updateLinkFn, loading: updateLoading } = useRequest(updateLink, {
        manual: true,
        onSuccess: () => {
            message.success('保存成功!');
            setAddOpen(false);
            form.resetFields();
            getPageInfo();
        }
    });

    const isAdd = useMemo(() => editLinkInfo === null, [editLinkInfo]);

    useEffect(() => {
        if (editLinkInfo !== null) {
            form.setFieldsValue({
                ...editLinkInfo,
            });
        } else if (category_id) {
            form.setFieldsValue({
                category_id
            });
        } else if (categories) {
            form.setFieldsValue({
                category_id: categories[0].value
            });
        }
    }, [editLinkInfo, form, categories, category_id]);

    const handleCreateLink = async (values) => {
        if (editLinkInfo !== null) {
            updateLinkFn({ ...values }, editLinkInfo.link_id)
        } else {
            addLinkFn({
                link_name: values.link_name,
                url: values.url,
                description: values.description,
                page_id,
            }, values.category_id)
        }
    };

    const handleCreate = () => {
        form
            .validateFields()
            .then((values) => {
                handleCreateLink(values);
            })
            .catch(() => { });
    };

    return (
        <Modal
            open={open}
            title={isAdd ? '添加链接' : '编辑链接'}
            okText={isAdd ? '新增' : '保存'}
            cancelText="取消"
            onCancel={() => setAddOpen(false)}
            onOk={handleCreate}
            confirmLoading={addLoading || updateLoading}
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
                    name="category_id"
                    label="所属分类"
                    rules={[{ required: true, message: '请选择所属分类!' }]}
                >
                    <Select
                        options={categories}
                    ></Select>
                </Form.Item>
                <Form.Item name="description" label="描述">
                    <Input.TextArea maxLength={100} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddLink;
