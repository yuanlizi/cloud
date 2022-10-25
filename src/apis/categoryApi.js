import axios from "axios"


export default {
    // 增加分类
    addCategory(data) {
        return axios({
            url: '/manage/category/add',
            method: "post",
            data
        })
    },
    // 获取分类
    getCategory(data) {
        return axios({
            url: '/manage/category/list',
            method: 'post',
            data
        })
    },
     // 修改分类
     updateCategory(data) {
        return axios({
            url: '/manage/category/update',
            method: 'post',
            data
        })
    }
}