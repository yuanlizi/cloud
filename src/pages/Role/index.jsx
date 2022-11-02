import React, { useEffect, useState, useRef } from 'react'
import { Card, Button, Table, Modal, message, Tree, Input, Select } from 'antd';
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
import { getRoleAC, createRoleAC, updateRoleAC } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../config/dateConfig';
const { Option } = Select;
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
  const dispatch = useDispatch()
  // 获取创建用户的值
  const createRoleRef = useRef(null)
  // 控制创建角色页面打开与关闭
  const [createRole, setCreateRole] = useState(false)
  // 控制设置用户权限的按钮是否可用
  const [rolePermissions, setRolePermissions] = useState(true)
  // 控制设置用户权限的界面打开与关闭
  const [rolePermissionsScreen, setRolePermissionsScreen] = useState(false)
  // 选中的角色
  const [role, setRole] = useState({})
  // 权限里选择的值
  const [value, setValue] = useState(undefined);
  // 权限时长
  const [permissionsTime, setPermissionsTime] = useState()
  // 角色列表
  const roleList = useSelector(state => state.users.roleList)
  
  useEffect(() => {
    getRole()
  }, [])


  // 点击树节点
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  // 根据menuList生成treeData
  const treeDataRender = (menu) => {
    return menu.map(item => {
      if (item.children) {
        return {
          title: item.label,
          key: item.key,
          children: treeDataRender(item.children)
        }
      } else {
        return {
          title: item.label,
          key: item.key,
        }
      }
    })
  }
  // 设置角色权限确定
  const rolePermissionsOk = async () => {
    const _id = role._id
    const menus = value
    const auth_time = new Date().getTime() + (permissionsTime - 0) * 60 * 60 * 1000
    const auth_name = JSON.parse(localStorage.getItem('data')).username
    console.log(123, 'auth_time', auth_time);
    const data = await dispatch(updateRoleAC({ _id, menus, auth_time, auth_name }))
    if (!data.status) {
      console.log('data', data);
      message.success('修改权限成功')
      setRolePermissionsScreen(false)
      getRole()
    } else {
      message.error(data.msg)
    }
  }
  // 选择行
  const selectRow = (role) => {
    return {
      // 点击事件
      onClick: event => {
        setRolePermissions(false)
        setRole(role)
      }
    }
  }
  // 创建用户确定
  const createOk = async () => {
    const roleName = createRoleRef.current.value
    const data = await dispatch(createRoleAC({ roleName }))
    if (!data.status) {
      message.success("角色创建成功")
      getRole()
      setCreateRole(false)
    } else {
      message.error(data.msg)
    }
  }

  // 获取角色
  const getRole = () => {
    dispatch(getRoleAC())
  }
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
    },
    {
      title: '有效时长',
      dataIndex: 'auth_time',
      key: 'auth_time',
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
      key: 'auth_name',
    }
  ];
  return (
    <>
      <Card title={<>
        <Button onClick={() => { setCreateRole(true) }} style={{ backgroundColor: '#109477', color: 'white', borderRadius: '5px' }}>创建角色</Button>
        <Button onClick={() => { setRolePermissionsScreen(true) }} disabled={rolePermissions} style={rolePermissions ? { backgroundColor: '#f2f4f0', color: '#d0cdcc', marginLeft: '10px', borderRadius: '5px' } : { backgroundColor: '#109477', color: 'white', marginLeft: '10px', borderRadius: '5px' }}>设置角色权限</Button>
      </>}>
        {/* 角色信息 */}
        <Table onRow={selectRow} rowSelection={{ type: 'radio',
         selectedRowKeys: [role._id],
        //  点击radio也可以选中行
         onSelect: role => {
          setRole(role)
         }
         }} rowKey='_id' pagination={{ defaultCurrent: 1, pageSizeOptions: [1, 3, 5], showQuickJumper: true, showSizeChanger: true }} bordered columns={columns} dataSource={roleList} />
      </Card>
      {/* 创建角色 */}
      <Modal title="创建角色" open={createRole} onOk={createOk} onCancel={() => setCreateRole(false)}>
        <input ref={createRoleRef} type="text" style={{ height: '30px', width: '100%' }} placeholder='请输入角色名称' />
      </Modal>
      {/* 设置角色权限 */}
      <Modal title="设置角色权限" open={rolePermissionsScreen} onOk={rolePermissionsOk} onCancel={() => setRolePermissionsScreen(false)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>角色名称:</span>
          <Input disabled style={{ width: 350, marginLeft: '10px' }} placeholder="" defaultValue={role.name} />
        </div>
        {/* 权限时长 */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <span>权限时长:</span>
          <Select
            style={{ width: 350, marginLeft: '10px' }}
            defaultValue="1小时"
            onChange={value => setPermissionsTime(value)}
          >
            <Option value="1">1小时</Option>
            <Option value="3">3小时</Option>
            <Option value="5">5小时</Option>
            <Option value="8">8小时</Option>
          </Select>
        </div>
        {/* 树选择 */}
        <Tree
          style={{ marginTop: '20px' }}
          checkable    //支持多选
          defaultCheckedKeys={role.menus}     //默认选中的权限列表
          defaultExpandAll    //展开所有
          onSelect={onSelect}     //点击树节点触发
          onCheck={(checkedKeys) => setValue(checkedKeys)}   //点击复选框触发
          treeData={treeDataRender(menuList)}     //数据数组
        />
      </Modal>
    </>
  )
}
