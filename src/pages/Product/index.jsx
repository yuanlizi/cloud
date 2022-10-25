import React from 'react'
import { Button, Table } from 'antd'
import { Outlet,useNavigate } from 'react-router';
import {
  PlusOutlined,
} from '@ant-design/icons';
export default function index() {
  const navigate = useNavigate()

  // 添加商品
  const addProduct = () => {
    // 跳转到产品新增修改界面
    navigate('addUpdate')
  }
  return (
    <div className='product'>
      <div className='top'>
        <div className='left'>
          <select name="" id="">
            <option value="按名称搜索">按名称搜索</option>
            <option value="按描述搜索">按描述搜索</option>
          </select>
          <input placeholder='关键字' type="text" />
          <Button>搜索</Button>
        </div>
        <div className='right'>
          <Button onClick={addProduct}>
            <PlusOutlined style={{ color: 'white' }} />
            <span>添加</span>
          </Button>
        </div>
      </div>
      <div className='border'></div>
      <div className='container'>
        <Table />
      </div>
    </div>
  )
}
