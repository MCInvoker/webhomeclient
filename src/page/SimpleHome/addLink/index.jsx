import React, { useEffect, useMemo, useState } from 'react';

import { Form, Input, Modal, Select, message, Upload, Image } from 'antd';
import { useRequest } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

import { addLink, updateLink } from '../../../api/link';
import { getStsToken } from '../../../api/sts';
import { getBase64 } from '../../../utils/utils';

function AddLink (props) {
    const { open, setAddOpen, editLinkInfo, getPageInfo, category_id, categories, page_id } = props;
    const [form] = Form.useForm();
    const [stsInfo, setStsInfo] = useState({ // 图片上传token信息
        AccessKeyId: '',
        AccessKeySecret: '',
        SecurityToken: '',
        Expiration: '',
    })
    const [previewOpen, setPreviewOpen] = useState(false); // 图片预览，图片是否是预览状态
    const [previewImage, setPreviewImage] = useState(''); // 要预览的图片的地址
    const [fileList, setFileList] = useState([]); // 上传的图片列表，这个功能中只有一张图片
    // 获取图片上传token信息
    const { runAsync: getStsTokenFn } = useRequest(getStsToken, {
        manual: true,
        onSuccess: (res) => {
            setStsInfo(res.data)
        },
    })

    // 获取图片上传token信息
    useEffect(() => {
        getStsTokenFn()
    }, [])

    // 新增链接
    const { run: addLinkFn, loading: addLoading } = useRequest(addLink, {
        manual: true,
        onSuccess: () => {
            message.success('新增成功!');
            setAddOpen(false);
            getPageInfo();
            form.resetFields();
        },
    });
    // 修改链接
    const { run: updateLinkFn, loading: updateLoading } = useRequest(updateLink, {
        manual: true,
        onSuccess: () => {
            message.success('保存成功!');
            setAddOpen(false);
            form.resetFields();
            getPageInfo();
        }
    });

    // 是否新增链接
    const isAdd = useMemo(() => editLinkInfo === null, [editLinkInfo]);

    // 初始化表单信息
    useEffect(() => {
        if (editLinkInfo !== null) {
            form.setFieldsValue({
                ...editLinkInfo,
                icon: editLinkInfo.icon || undefined
            });
            if (editLinkInfo.icon) {
                setFileList([{ uid: -1, status: 'done', url: editLinkInfo.icon }]);
            }
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

    // 保存表单
    const handleCreateLink = async (values) => {
        if (editLinkInfo !== null) {
            updateLinkFn({ ...values }, editLinkInfo.link_id)
        } else {
            addLinkFn({
                link_name: values.link_name,
                url: values.url,
                description: values.description,
                page_id,
                icon: values.icon
            }, values.category_id)
        }
    };

    // 点击保存
    const handleCreate = () => {
        form
            .validateFields()
            .then((values) => {
                handleCreateLink(values);
            })
            .catch(() => { });
    };

    // 上传图片
    const customRequest = async (options) => {
        const { file, onSuccess, onError } = options;
        try {
            // 生成一个唯一的时间戳
            const timestamp = Date.now().toString();
            // 为文件名添加时间戳后缀
            const uniqueFileName = `${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;

            // eslint-disable-next-line no-undef
            const client = new OSS({
                // 将<YOUR_BUCKET>设置为OSS Bucket名称。
                bucket: "webhomeide",
                // 将<YOUR_REGION>设置为OSS Bucket所在地域，例如oss-cn-hangzhou。
                region: "oss-cn-hangzhou",
                accessKeyId: stsInfo.AccessKeyId,
                accessKeySecret: stsInfo.AccessKeySecret,
                stsToken: stsInfo.SecurityToken,
                useFetchUploadToken: false // 禁用直传方式获取上传凭证
            });
            // const result = await client.put('linkIcon/' + e.name, e);
            const result = await client.put('uploads/' + uniqueFileName, file);
            onSuccess(result.url);
            form.setFieldsValue({ icon: result.url });
            setFileList([{
                uid: '-1',
                name: uniqueFileName,
                status: 'done',
                url: result.url,
            }])
        } catch (error) {
            // 捕获异常，调用 onError 并传入错误信息
            onError(error.message || '上传失败');
        }
    };

    const handleRemove = () => {
        setFileList([])
        form.setFieldsValue({ icon: '' });
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url);
        setPreviewOpen(true);
    }

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
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
            >
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
                <Form.Item label="图标" name="icon">
                    <ImgCrop
                        rotationSlider
                        modalOk='确定'
                        modalCancel='取消'
                    >
                        <Upload
                            listType="picture-card"
                            customRequest={customRequest}
                            maxCount={1}
                            onRemove={handleRemove}
                            onPreview={handlePreview}
                            fileList={fileList}
                        >
                            {fileList.length >= 1 ? null : (<button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    上传图标
                                </div>
                            </button>)}
                        </Upload>
                    </ImgCrop>
                </Form.Item>
                {previewImage && (
                    <Image
                        wrapperStyle={{
                            display: 'none',
                        }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </Form>
        </Modal>
    );
}

export default AddLink;
