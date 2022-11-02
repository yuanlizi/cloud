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
    },
    // 删除图片
    deleteImg(data) {
        return axios({
            url: '/manage/img/delete',
            method: 'post',
            data
        })
    },
     // 新增商品
     addProduct(data) {
        return axios({
            url: '/manage/product/add',
            method: 'post',
            data
        })
    },
     // 修改商品
     updateProduct(data) {
        return axios({
            url: '/manage/product/update',
            method: 'post',
            data
        })
    },
     // 获取商品列表
     getProduct(data) {
        return axios({
            url: `/manage/product/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
            method: 'get',
        })
    },
     // 根据搜索值获取商品列表
     getSearchProduct(data) {
        return axios({
            url: `/manage/product/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&${data.productName ? `productName=${data.productName}` : `productDesc=${data.productDesc}`}`,
            method: 'get',
        })
    },
     // 修改商品状态
     updateStatus(data) {
        console.log('data', data);
        return axios({
            url: '/manage/product/updateStatus',
            method: 'post',
            data
        })
    },
}