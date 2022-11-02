import React, { useState, useEffect, useRef } from 'react'
import { Card, Checkbox, Form, Input, Button, Cascader, Upload, message, Select } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { createHashHistory } from '@remix-run/router';
import { deleteImgAC } from '../../store/category'
import { useNavigate, useLocation } from 'react-router';
import RichTextEditor from '../../components/RichTextEditor/index'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { getCategoryAC, getCategoryTwoAC, addProductAC, updateProductAC } from '../../store/category'
import ImgCrop from 'antd-img-crop';
const { TextArea } = Input
const { Option } = Select;
export default function index() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    // 使用子组件方法
    const childRef = useRef(null)
    // 用于存储的ref
    const storageRef = useRef(null)
    const history = createHashHistory({ window })
    // 用于存储显示的图片的数组
    const [fileList, setFileList] = useState([]);
    // 判断是修改还是新增 新增为false, 修改为true
    const [addOrUpdate, setAddOrUpdate] = useState(true)
    // 修改的默认值
    const [defaultVal, setDefaultVal] = useState(location.state || {})
    // 获取分类列表
    const categoryList = useSelector(state => state.category.categoryList)
    const categoryListTwo = useSelector(state => state.category.categoryListTwo)

    useEffect(() => {
        update()
        getCategory()
    }, [])
    // 修改
    const update = () => {
        const state = location.state === null ? false : location.state
        storageRef.state = state
        setAddOrUpdate(state === false ? false : true)
        if (storageRef.state && storageRef.state.imgs.length > 0) {
            let baseUrl = 'http://localhost:5000/upload/'
            let imgs = storageRef.state.imgs.map((item, index) => {
                return {
                    uid: -index,
                    name: item,
                    status: 'done',
                    url: baseUrl + item
                }
            })
            // 获取二级分类
            dispatch(getCategoryTwoAC({ parentId: storageRef.state.pCategoryId }))
            // 修改fileList
            setFileList(imgs)
        }
    }
    // 获取一级分类
    const handleChange = (value) => {
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
    const onFinish = async (values) => {
        const detail = childRef.current.getHtml()
        values.detail = detail
        values.imgs = getImages()
        if (addOrUpdate) {  //新增数据
            values._id = storageRef.state._id
            const data = await dispatch(updateProductAC(values))
            if (!data.status) {
                message.success('修改成功')
                navigate('/index/product')
            } else {
                message.error(data.msg)
            }
        } else {    //修改数据
            const data = await dispatch(addProductAC(values))
            if (!data.status) {
                message.success('新增成功')
            } else {
                message.error(data.msg)
            }
        }

    };
    // 表单提交失败
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card title={<><ArrowLeftOutlined onClick={goPrev} style={{ color: '#109477' }} /><span style={{ marginLeft: '10px' }}>商品详情</span></>}>
            <Form
                initialValues={defaultVal}
                name="basic"
                labelCol={{
                    span: 2,
                }}
                wrapperCol={{
                    span: 8,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    <Select
                        onChange={handleChange}
                    >
                        {
                            categoryList.map(item => {
                                return <Option key={item._id} value={item._id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    initialValues={defaultVal.categoryId}
                    label="商品二级种类:"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: '请选择商品二级种类!',
                        },
                    ]}
                >
                    <Select
                    >
                        {
                            categoryListTwo.map(item => {
                                return <Option key={item._id} value={item._id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>


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
                    <RichTextEditor detail={defaultVal.detail} ref={childRef} />
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
