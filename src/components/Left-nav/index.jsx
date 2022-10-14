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
import { Button, Menu } from 'antd';

import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png'
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


const index = () => {




    return (
        <div className='left-nav'>
            <div className='header'>
                <img src={logo} alt="" />
                <span>硅谷后台</span>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuList}
            />
        </div>
    );
};
export default index;