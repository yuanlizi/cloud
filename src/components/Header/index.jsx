import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/exports';
import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
    WindowsOutlined
} from '@ant-design/icons';
import { useEffect } from 'react';
import { formatDate } from '../../config/dateConfig'
import { useNavigate, useLocation } from 'react-router'
const menuList = [
    {
        label: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: <HomeOutlined />, // 图标名称
        isPublic: true, // 公开的
    },
    {
        label: '商品',
        key: '/products',
        icon: <AppstoreOutlined />,
        children: [ // 子菜单列表
            {
                label: '品类管理',
                key: '/category',
                icon: <BarsOutlined />
            },
            {
                label: '商品管理',
                key: '/product',
                icon: <ToolOutlined />
            },
        ]
    },

    {
        label: '用户管理',
        key: '/user',
        icon: <UserOutlined />
    },
    {
        label: '角色管理',
        key: '/role',
        icon: <SafetyOutlined />,
    },

    {
        label: '图形图表',
        key: '/charts',
        icon: <AreaChartOutlined />,
        children: [
            {
                label: '柱形图',
                key: '/charts/bar',
                icon: <BarChartOutlined />
            },
            {
                label: '折线图',
                key: '/charts/line',
                icon: <LineChartOutlined />
            },
            {
                label: '饼图',
                key: '/charts/pie',
                icon: <PieChartOutlined />
            },
        ]
    },

    {
        label: '订单管理',
        key: '/order',
        icon: <WindowsOutlined />,
    },
]
export default function index() {
    const navigate = useNavigate()
    const location = useLocation()
    const [date, setDate] = useState('')
    const title = useSelector(state => state.users.title)
    useEffect(() => {
        // let newLabel = getPath()
        // setLabel(newLabel)
    }, [])
    const timer = setInterval(() => {
        let date = new Date()
        date = formatDate(date)
        setDate(date)
    }, 1000)
    const exit = () => {
        localStorage.removeItem('data')
        navigate('/login', {replace: true})
    }
    return (
        <div className='header'>
            <div className='top'>
                <span>欢迎您，admin</span>
                <span className='exit' onClick={exit}>退出</span>
            </div>
            <div className='center'>

            </div>
            <div className='bottom'>
                <span className='left'>{title}</span>
                <div className='right'>
                    <span className='date'>{date}</span>
                    <span>晴</span>
                </div>
            </div>
        </div>
    )
}
