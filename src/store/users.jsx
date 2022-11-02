import { createSlice } from "@reduxjs/toolkit"
import { message } from 'antd';
import usersApi from '../apis/usersApi';
import { formatDate } from '../config/dateConfig';
export const usersSlice = createSlice({
    name: "users",
    initialState: {
        //登录的用户
        userInfo: {},
        //选中的路由标签
        title: '',
        // 角色列表
        roleList: [],
        // 用户列表
        userList: []
    },
    reducers: {
        // 
        getLoginUser: (state, action) => {
            state.userInfo = action.payload
        },
        // 设置选中的路由标签
        setTitle: (state, action) => {
            state.title = action.payload
        },
        // 获取角色
        getRoleSC: (state, action) => {
            state.roleList = action.payload
        },
        // 获取用户
        getUserSC: (state, action) => {
            state.userList = action.payload
        },
    }
})
export const { getLoginUser, setTitle, getRoleSC, getUserSC } = usersSlice.actions
export default usersSlice.reducer
// 登录
export const loginAC = (payload) => async (dispatch) => {
    const data = await usersApi.login(payload)
    console.log(data);
    if (!data.status) {
        localStorage.setItem('data', JSON.stringify(data.data))
        dispatch(getLoginUser(data.data))
        return data
    } else {
        return data
    }
}
// 获得所有角色
export const getRoleAC = () => async (dispatch) => {
    const data = await usersApi.getRole()
    if (!data.status) {
        let newData = data.data.map(item => {
            return {
                ...item,
                create_time: formatDate(item.create_time),
                auth_time: formatDate(item.auth_time)
            }
        })
        dispatch(getRoleSC(newData))
    }
}

// 创建角色
export const createRoleAC = (payload) => async (dispatch) => {
    const data = await usersApi.createRole(payload)
    return data
}

// 更新角色
export const updateRoleAC = (payload) => async (dispatch) => {
    const data = await usersApi.updateRole(payload)
    return data
}

// 添加用户
export const addUserAC = (payload) => async (dispatch) => {
    const data = await usersApi.addUser(payload)
    return data
}

// 删除用户
export const deleteUserAC = (payload) => async (dispatch) => {
    const data = await usersApi.deleteUser(payload)
    return data
}

// 修改用户
export const updateUserAC = (payload) => async (dispatch) => {
    const data = await usersApi.updateUser(payload)
    return data
}
// 获取用户
export const getUserAC = () => async (dispatch) => {
    const data = await usersApi.getUser()
    if (!data.status) {
        let users = data.data.users
        let roles = data.data.roles
        // 转化创建日期及所属角色
        users = users.map(item => {
            let role_id = roles.filter(item2 => {
                if (item.role_id === item2._id) {
                    return item2
                }
            })[0].name
            let create_time = formatDate(item.create_time)
            return {
                role_id,
                create_time,
                email: item.email,
                password: item.password,
                phone: item.phone,
                username: item.username,
                __v: item.__v,
                _id: item._id
            }
        })
        dispatch(getUserSC(users))
    }
}