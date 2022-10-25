import React, { useState, useEffect, useRef } from 'react'
import { Button, message, Space, Table, Tag, Modal, Select, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAC, getCategoryAC, updateCategoryAC } from '../../store/category';
import {
  PlusOutlined,
} from '@ant-design/icons';


export default function index() {
  const dispatch = useDispatch()
  // 储存下拉框的值
  const selectRef = useRef(null)
  // 储存输入框的值
  const inputRef = useRef(null)
  // 储存修改分类框的值
  const updateRef = useRef(null)
  // 查看子分类列表的参数parentId
  const [searchParentId, setSearchParentId] = useState()
  // 控制一级标题
  const [parentName, setParentName] = useState()
  // 控制修改分类框的值
  const [updateCategoryVal, setUpdateCategoryVal] = useState({});
  // 控制弹出增加分类框
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 控制弹出子分类框
  const [childrenModel, setChildrenModel] = useState(false);
  // 控制弹出修改分类框
  const [updateCategory, setUpdateCategory] = useState(false);
  // 获取分类列表
  const categoryList = useSelector(state => state.category.categoryList)
  useEffect(() => {
    getCategory()
  }, [])
  // 打开子分类
  const showChildrenModal = async (val) => {
    setParentName(val.name)
    const parentId = val._id
    await getCategory(parentId)
    setSearchParentId(parentId)
    setChildrenModel(true)
  }
  // 弹出修改分类界面
  const showUpdateModal = (val) => {
    setUpdateCategoryVal(val)
    setUpdateCategory(true)
  };
  // 修改分类确定
  const updateCategoryOK = async () => {
    const categoryId = updateCategoryVal._id
    const categoryName = updateRef.current.value ? updateRef.current.value : updateCategoryVal.name
    if (categoryName !== updateCategoryVal.name) {
      const data = await dispatch(updateCategoryAC({ categoryId, categoryName }))
      if (!data.status) {
        message.success('分类修改成功')
        getCategory(searchParentId)
      } else {
        message.error(data.msg)
      }
      setUpdateCategory(false)
    } else {
      message.error('修改值没有变化')
    }
  }
  // 修改分类取消
  const updateCategoryCancel = () => {
    setUpdateCategory(false)
  }
  // 弹出增加界面
  const showModal = () => {
    getCategory()
    setIsModalOpen(true);
  };

  // 获取分类列表
  const getCategory = (val) => {
    const parentId = val
    if (!parentId) {
      setChildrenModel(false)
      dispatch(getCategoryAC())
    } else if (parentId === '一级分类列表') {
      setParentName(null)
      setChildrenModel(false)
      dispatch(getCategoryAC(),)
    }
    else {
      setChildrenModel(true)
      dispatch(getCategoryAC({ parentId }))
    }
  }
  // 确定增加分类
  const handleOk = () => {
    const parentId = selectRef.current.value === '一级分类列表' ? '0' : selectRef.current.value
    const categoryName = inputRef.current.value
    dispatch(addCategoryAC({ parentId, categoryName }))
    getCategory(parentId)
    setIsModalOpen(false);
  };
  // 取消分类
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      width: 1200
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showUpdateModal(record)}>修改分类</a>
          <a style={childrenModel ? { display: 'none' } : { display: 'block' }} onClick={() => showChildrenModal(record)}>查看子分类</a>
        </Space>
      ),
    },
  ];

  return (
    <div className='category'>
      <div className='top'>
        <div>
          <a onClick={() => { getCategory('一级分类列表') }}>一级分类列表</a>
          {
            parentName ? <span className='title'>{parentName}</span> : ''
          }
        </div>
        <Button onClick={showModal}>
          <PlusOutlined style={{ color: 'white' }} />
          <span>添加</span>
        </Button>
      </div>
      <div className='border'></div>
      <div className='container'>
        {
          !childrenModel ? <Table pagination={{ defaultCurrent: 1, pageSizeOptions: [1, 5, 10], showQuickJumper: true, showSizeChanger: true }} bordered columns={columns} dataSource={categoryList} /> : <Table pagination={{ defaultCurrent: 1, pageSizeOptions: [1, 5, 10], showQuickJumper: true, showSizeChanger: true }} bordered columns={columns} dataSource={categoryList} />
        }
      </div>
      {/*新增分类 */}
      <Modal title="添加分类" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>所属分类</p>
        <select ref={selectRef} name="" id="" style={{ height: '30px', width: '100%' }}>
          {
            categoryList.map(item => {
              return <option key={item._id} value={item._id}>{item.name}</option>
            })
          }
        </select>
        <p style={{ marginTop: '20px' }}>分类名称</p>
        <input ref={inputRef} type="text" style={{ height: '30px', boxSizing: 'borderBox', width: '100%', border: '1px solid gray' }} />
      </Modal>
      {/* 修改分类 */}
      <Modal title="修改分类" open={updateCategory} onOk={updateCategoryOK} onCancel={updateCategoryCancel}>
        <input ref={updateRef} placeholder={updateCategoryVal.name} type="text" style={{ height: '30px', width: '100%' }} />
      </Modal>
    </div>
  )
}
