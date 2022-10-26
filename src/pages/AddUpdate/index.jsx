import React, { useState, useEffect, useRef } from 'react'
import { Card, Checkbox, Form, Input, Button, Cascader, Upload, message, Select } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { createHashHistory } from '@remix-run/router';
import { deleteImgAC } from '../../store/category'
import RichTextEditor from '../../components/RichTextEditor/index'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { getCategoryAC, getCategoryTwoAC } from '../../store/category'
import ImgCrop from 'antd-img-crop';
const { TextArea } = Input
const { Option } = Select;
export default function index() {
    const dispatch = useDispatch()
    // 使用子组件方法
    const childRef = useRef(null)
    // 一级分类
    const oneRef = useRef(null)
    const history = createHashHistory({ window })
    // 用于存储显示的图片的数组
    const [fileList, setFileList] = useState([]);
    // 获取分类列表
    const categoryList = useSelector(state => state.category.categoryList)
    const categoryListTwo = useSelector(state => state.category.categoryListTwo)

    useEffect(() => {
        getCategory()
    }, [])
    // 获取一级分类
    const handleChange = () => {
        
        const value = oneRef.current.value
        console.log('value', value);
        getCategory(value)

    };
    // 获取分类列表
    const getCategory = (val) => {
        const parentId = val
        if (!parentId) {
            dispatch(getCategoryAC())
        } else {
            dispatch(getCategoryTwoAC({ parentId }))
        }
    }
    // 获取图片名字
    const getImages = () => {
        return fileList.map(item => {
            return item.name
        })
    }
    // 返回商品详情
    const goPrev = () => {
        history.go(-1)
    }
    // 图片上传
    const onChange = async ({ file, fileList: newFileList }) => {
        //上传服务器图片
        if (newFileList[newFileList.length - 1]?.status === 'done') {
            if (!newFileList[newFileList.length - 1].response.status) {
                message.success('图片上传成功')
                const { data: { name, url } } = newFileList[newFileList.length - 1].response
                newFileList[newFileList.length - 1].name = name
                newFileList[newFileList.length - 1].url = url
            } else {
                message.error('图片上传失败')
            }
        } else if (file.status === 'removed') { //删除服务器图片
            const data = await dispatch(deleteImgAC({ name: file.name }))
            if (!data.status) {
                message.success('图片删除成功')
            } else {
                message.error(data.msg)
            }
        }
        setFileList(newFileList);

    };
    // 放大图片展示
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
        console.log('child', childRef.current.getHtml());
        values.imgs = getImages()
        console.log('Success:', values);
    };
    // 表单提交失败
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card title={<><ArrowLeftOutlined onClick={goPrev} style={{ color: '#109477' }} /><span style={{ marginLeft: '10px' }}>商品详情</span></>}>
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
                            message: '请输入商品详情!',
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
                <Form.Item
                    label="商品一级种类:"
                    name="pCategoryId"
                    rules={[
                        {
                            required: true,
                            message: '请选择商品一级种类!',
                        },
                    ]}
                >
                    <select ref={oneRef} style={{width: '100%', border: '1px solid #d9d9d9', height: '32px', padding: '0px 10px'}} name="" id="" onBlue={handleChange}>
                        {
                           categoryList.length> 1 && categoryList.map(item => {
                                return <option key={item._id} value={item._id}>{item.name}</option>
                            })
                        }
                    </select>
                </Form.Item>
                {
                    categoryListTwo.length > 1 && <Form.Item
                        label="商品二级种类:"
                        name="pCategoryId"
                        rules={[
                            {
                                required: true,
                                message: '请选择商品二级种类!',
                            },
                        ]}
                    >
                        <select style={{width: '100%', border: '1px solid #d9d9d9', height: '32px', padding: '0px 10px'}} name="" id="">
                            {
                                categoryListTwo.map(item => {
                                    return <option key={item._id} value={item._id}>{item.name}</option>
                                })
                            }
                        </select>
                    </Form.Item>
                }

                <Form.Item label="商品图片" valuePropName="fileList">
                    <ImgCrop rotate>
                        <Upload
                            action="/api//manage/img/upload"   //上传文件地址
                            accept='image/*'        //上传文件格式
                            name='image'        //上传文件参数名
                            listType="picture-card"        //显示图片的格式
                            fileList={fileList}     //上传的文件数组
                            onChange={onChange}     //上传图片
                            onPreview={onPreview}   //显示大图
                        >
                            {fileList.length < 5 && '+ '}
                        </Upload>
                    </ImgCrop>
                </Form.Item>
                <Form.Item
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    label="商品描述:"
                    name="detail"
                >
                    <RichTextEditor ref={childRef} />
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
