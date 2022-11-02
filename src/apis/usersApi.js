import axios from "axios"


export default {
    // 登录
    login(data) {
        return axios({
            url: '/login',
            method: 'post',
            data
        })
    },
    // 获得所有角色
    getRole() {
        return axios({
            url: '/manage/role/list',
            method: 'get'
        })
    },
     // 创建角色
     createRole(data) {
        return axios({
            url: '/manage/role/add',
            method: 'post',
            data
        })
    },
     // 更新角色
     updateRole(data) {
        return axios({
            url: '/manage/role/update',
            method: 'post',
            data
        })
    },
     // 添加用户
     addUser(data) {
        return axios({
            url: '/manage/user/add',
            method: 'post',
            data
        })
    },
    // 获取用户
    getUser() {
        return axios({
            url: '/manage/user/list',
            method: 'get',
        })
    },
    // 删除用户
    deleteUser(data) {
        return axios({
            url: '/manage/user/delete',
            method: 'post',
            data
        })
    },
    // 修改用户
    updateUser(data) {
        return axios({
            url: '/manage/user/update',
            method: 'post',
            data
        })
    },
}