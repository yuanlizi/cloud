import React, { useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import logo from '../../assets/images/logo.png'
import { loginAC } from '../../store/users'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function index() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        judgeData()
    })
    // 判断是否登录，如果登录则删除本地储存里data
    const judgeData = () => {
        const data = JSON.parse(localStorage.getItem('data'))
        if (data) {
            localStorage.removeItem('data')
        } 
    }
    // 登录
    const onFinish = async (values) => {
        const result = await dispatch(loginAC(values))
        if (!result.status) {
            message.success(`登陆成功，欢迎您，${result.data.username}`)
            navigate('/home')
        } else {
            message.error(result.msg)
        }
    };
    return (
        <div className='login'>
            <div className='header'>
                <img src={logo} alt="logo" />
                <span>React项目：后台管理系统</span>
            </div>
            <div className='con'>
                <h2 className='title'>用户登录</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                            {
                                min: 3,
                                message: '用户名不能少于4位!',
                            },
                            {
                                max: 16,
                                message: '用户名不等多于16位!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            {
                                min: 3,
                                message: '密码不能少于4位!',
                            },
                            {
                                max: 16,
                                message: '密码不等多于16位!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ backgroundColor: '#109477', border: 'none' }} type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
