import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

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
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLink;