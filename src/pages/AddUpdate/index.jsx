import React, { useState, useEffect } from 'react'
import { Card, Checkbox, Form, Input, Button, Cascader, Upload, message } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { getCategoryAC } from '../../store/category'
import { useDispatch, useSelector } from 'react-redux';
import ImgCrop from 'antd-img-crop';
const { TextArea } = Input

export default function index() {
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',  //id
        //     name: 'image.png',      //上传文件的名字
        //     status: 'done',         //已上传的文件状态
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',    //上传后返回的地址
        // },
    ]);
    const onChange = ({file, fileList: newFileList }) => {
        // console.log('file', file, newFileList);  
        if (newFileList[newFileList.length - 1]?.status === 'done') {
            if (!newFileList[newFileList.length - 1].response.status) {
                message.success('图片上传成功')
                const { data: {name, url} } = newFileList[newFileList.length - 1].response
                newFileList[newFileList.length - 1].name = name
                newFileList[newFileList.length - 1].url = url
                console.log(123123, newFileList);
            } else {
                message.error('图片上传失败')
            }
        } 
        setFileList(newFileList);

    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    // 表单提交成功
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    // 表单提交失败
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card title={<><ArrowLeftOutlined style={{ color: '#109477' }} /><span style={{ marginLeft: '10px' }}>商品详情</span></>}>
            <Form
                name="basic"
                labelCol={{
                    span: 2,
                }}
                wrapperCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="商品名称:"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品名称!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品详情:"
                    name="desc"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品描述!',
                        },
                    ]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="商品价格:"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品价格!',
                        },
                    ]}
                >
                    <Input type='number' addonAfter='元' placeholder='请输入商品价格' />
                </Form.Item>
                <Form.Item label="商品图片" valuePropName="fileList">
                    <ImgCrop rotate>
                        <Upload
                            action="/api//manage/img/upload"   //上传文件地址
                            accept='image/*'        //上传文件格式
                            name='image'        //上传文件参数名
                            listType="picture-card"        //显示图片的格式
                            fileList={fileList}     //上传的文件数组
                            onChange={onChange}     //
                            onPreview={onPreview}   //显示大图
                        >
                            {fileList.length < 5 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 2,
                        span: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
