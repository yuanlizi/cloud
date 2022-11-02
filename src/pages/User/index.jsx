import React, { useEffect, useState, useRef } from 'react'
import { Card, Button, Table, Modal, message, Input, Checkbox, Form, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleAC, addUserAC, getUserAC, deleteUserAC, updateUserAC } from '../../store/users';
const { Option } = Select;
export default function index() {
  const dispatch = useDispatch()
  // 打开创建/修改用户
  const [createUser, setCreateUser] = useState(false)
  // 创建/修改的默认用户数据
  const [defaultVal, setDefaultVal] = useState()
  // 角色列表s
  const roleList = useSelector(state => state.users.roleList)
  // 用户列表
  const userList = useSelector(state => state.users.userList)
  // FormRef
  const FormRef = useRef(null)
  useEffect(() => {
    getRole()
    getUser()
  }, [])
  // 当默认用户数据修改时，重置表单项
  useEffect(() => {
    FormRef && FormRef.current && FormRef.current.resetFields()
  }, [defaultVal])

  // 修改用户
  const updateBtn = (record) => {
    setDefaultVal(record)
    setCreateUser(true)
  }
  // 删除用户
  const deleteBtn = async (record) => {
    const data = await dispatch(deleteUserAC({ userId: record._id }))
    if (!data.status) {
      message.success('用户删除成功')
      getUser()
    } else {
      message.error(data.msg)
    }
  }
  // 添加/修改用户
  const onFinishOK = async (values) => {
    if (!defaultVal) {  //添加用户
      console.log('values2', values);
      const data = await dispatch(addUserAC(values))
      if (!data.status) {
        message.success('添加用户成功')
        getUser()
        setCreateUser(false)
      } else {
        message.error(data.msg)
      }
    } else {  //修改用户
      const _id = defaultVal._id
      const newVal = { _id, ...values }
      const data = await dispatch(updateUserAC(newVal))
      if (!data.status) {
        message.success('用户资料修改成功')
        getUser()
        setCreateUser(false)
      } else {
        message.error(data.msg)
      }
    }
  }
  // 获取角色
  const getRole = () => {
    dispatch(getRoleAC())
  }
  // 获取用户
  const getUser = () => {
    dispatch(getUserAC())
  }

  // 修改用户取消
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      key: 'role_id',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => updateBtn(record)}>修改</a>
          <a onClick={() => deleteBtn(record)}>删除</a>
        </Space>
      ),
    }
  ];
  return (
    <>
      <Card title={<>
        <Button onClick={() => { setDefaultVal(undefined), setCreateUser(true) }} style={{ backgroundColor: '#109477', color: 'white', borderRadius: '5px' }}>创建角色</Button>
      </>}>
        {/* 角色信息 */}
        <Table rowKey='_id' pagination={{ defaultCurrent: 1, pageSizeOptions: [1, 3, 5], showQuickJumper: true, showSizeChanger: true }} bordered columns={columns} dataSource={userList} />
      </Card>
      <Modal title={defaultVal ? '修改用户' : '创建用户'} open={createUser} onOk={() => { setCreateUser(false) }} onCancel={() => { setCreateUser(false) }}>
        <Form
          ref={FormRef}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishOK}   //form表单提交成功
          onFinishFailed={onFinishFailed}   //form表单提交失败
          autoComplete="off"
        >
          {/* 用户名 */}
          <Form.Item
            initialValue={defaultVal?.username}     //表单默认值
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>
          {/* 密码 */}
          {
            defaultVal ? null : <Form.Item
              label="密码"
              initialValue={defaultVal?.password}     //表单默认值
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input />
            </Form.Item>
          }
          {/* 手机号 */}
          <Form.Item
            label="手机号"
            name="phone"
            initialValue={defaultVal?.phone}     //表单默认值
          >
            <Input />
          </Form.Item>
          {/* 邮箱 */}
          <Form.Item
            label="邮箱"
            name="email"
            initialValue={defaultVal?.email}     //表单默认值
          >
            <Input />
          </Form.Item>
          {/* 角色 */}
          <Form.Item
            label="角色"
            name="role_id"
          >
            <Select
              placeholder="请选择角色"
              allowClear
            >
              {
                roleList.map(item => {
                  return <Option key={item._id} value={item._id}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16, }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
