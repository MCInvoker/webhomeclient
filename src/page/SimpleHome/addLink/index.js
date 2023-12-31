import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddLink = (props) => {
    const { open, onCreate, onCancel } = props
    console.log(open)
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
            title="添加链接"
            okText="添加"
            cancelText="取消"
            onCancel={onCancel}
            onOk={handleCreate}
        >
            {/* //  {
        //     "link_id": 1,
        //     "category_id": 1,
        //     "link_name": "百度",
        //     "url": "https://www.baidu.com",
        //     "description": "百度一下你就知道",
        //     "created_at": "2023-12-06T02:11:57.000Z"
        // } */}
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
                {/* <Form.Item
          name="icon"
          label="图标"
        >
          <Input.TextArea />
        </Form.Item> */}
                {/* <Form.Item label="图标">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item> */}
                {/* <Form.Item label="图标" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
            </Form>
        </Modal>
    );
};

export default AddLink;