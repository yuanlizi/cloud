import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, message } from 'antd'
import { Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAC, getSearchProductAC, updateStatusAC } from '../../store/category'
import {
  PlusOutlined,
} from '@ant-design/icons';
export default function index() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 搜索类型
  const searchRef = useRef(null)
  // 搜索值
  const searchValRef = useRef(null)
  // 第几页
  const [pageNum, setPageNum] = useState(1)
  // 每页有几个
  const [pageSize, setPageSize] = useState(5)
  // 产品信息
  const productList = useSelector(state => state.category.productList)
  useEffect(() => {
    getProducts()
  }, [])
  // 跳转到修改界面
  const goAddUpdate = (val) => {
    navigate('addUpdate', {state: val})
  }
  // 修改产品状态
  const updateStatus = async (val) => {
    let {_id, status} = val
    status = status === 1 ? 2 : 1
    const data = await dispatch(updateStatusAC({productId: _id, status}))
    if (!data.status) {
      message.success('状态更新成功')
      getProducts()
    } else {
      message.error(data.msg)
    }
  }
  // 搜索产品
  const searchProduct = () => {
    const val = searchRef.current.value
    const searchVal = searchValRef.current.value
    if (val === 'productName') {
      dispatch(getSearchProductAC({pageNum, pageSize, productName: searchVal}))
    } else {
      dispatch(getSearchProductAC({pageNum, pageSize, productDesc: searchVal}))
    }
  }
  // 获取商品列表数据
  const getProducts = async () => {
    dispatch(getProductAC({ pageNum, pageSize }))
  }
  // 添加商品
  const addProduct = () => {
    // 跳转到产品新增修改界面
    navigate('addUpdate')
  }
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 300,
      key: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      width: 1000,
      key: 'desc'
    },
    {
      title: '商品价格',
      key: 'price',
      render: (_, record) => (
        <span>￥{record.price}</span>
      )
    },
    {
      title: '状态',
      key: 'status',
      render: (_, record) => (
        <>
          <div><Button onClick={() => {updateStatus(record)}} style={record.status === 1 ? {backgroundColor: '#109477', color: 'white'} : {backgroundColor: 'red', color: 'white'}} >{record.status === 1 ? '下架' : '上架'}</Button></div>
          <span style={{color: 'gray'}}>{record.status === 1 ? '在售' : '已下架'}</span>
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div style={{color: '#109477'}}>
          <div><span >详情</span></div>
          <span onClick={() => {goAddUpdate(record)}}>修改</span>
        </div>
      ),
    },
  ];
  return (
    <div className='product'>
      <div className='top'>
        {/* 搜索 */}
        <div className='left'>
          <select ref={searchRef} name="" id="">
            <option value="productName">按名称搜索</option>
            <option value="productDesc">按描述搜索</option>
          </select>
          <input ref={searchValRef}  placeholder='关键字' type="text" />
          <Button onClick={searchProduct}>搜索</Button>
        </div>
        {/* 添加 */}
        <div className='right'>
          <Button onClick={addProduct}>
            <PlusOutlined style={{ color: 'white' }} />
            <span>添加</span>
          </Button>
        </div>
      </div>
      <div className='border'></div>
      {/* 产品信息展示 */}
      <div className='container'>
        <Table rowKey='_id' pagination={{ defaultCurrent: 1, pageSizeOptions: [1, 5, 10], showQuickJumper: true, showSizeChanger: true }} bordered columns={columns} dataSource={productList.list} />
      </div>
    </div>
  )
}
