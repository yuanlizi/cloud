import { createSlice } from "@reduxjs/toolkit"
import { message } from 'antd';
import categoryApi from '../apis/categoryApi';
export const categorySlice = createSlice({
    name: "users",
    initialState: {
        // 一级分类列表
        categoryList: [],
        // 二级分类列表
        categoryListTwo: [],
        // 产品信息,
        productList: {}
    },
    reducers: {
        // 修改一级分类
        getCategorySC: (state, action) => {
            state.categoryList = action.payload
        },
        // 修改二级分类
        getCategoryTwoSC: (state, action) => {
            state.categoryListTwo = action.payload
        },
        // 修改产品信息
        getProductSC: (state, action) => {
            state.productList = action.payload
        },
    }
})
export const { getCategorySC, getCategoryTwoSC, getProductSC } = categorySlice.actions
export default categorySlice.reducer
// 增加分类
export const addCategoryAC = (payload) => async (dispatch) => {
    const data = await categoryApi.addCategory(payload)
    if (!data.status) {
        message.success('添加成功')
        dispatch(getCategoryAC(payload))
      } else {
        message.error(data.msg)
      }
}
// 获取分类
export const getCategoryAC = (payload) => async (dispatch) => {
    const data = await categoryApi.getCategory(payload)
    if (!data.status) {
        dispatch(getCategorySC(data.data))
    } else {
        message.error(data.msg)
    }
}
// 获取二级分类
export const getCategoryTwoAC = (payload) => async (dispatch) => {
    const data = await categoryApi.getCategory(payload)
    console.log();
    if (!data.status) {
        dispatch(getCategoryTwoSC(data.data))
    } else {
        message.error(data.msg)
    }
}
// 修改分类
export const updateCategoryAC = (payload) => async (dispatch) => {
    const data = await categoryApi.updateCategory(payload)
    return data
}

// 删除图片
export const deleteImgAC = (payload) => async (dispatch) => {
    const data = await categoryApi.deleteImg(payload)
    return data
}

// 新增商品
export const addProductAC = (payload) => async (dispatch) => {
    const data = await categoryApi.addProduct(payload)
    return data
}

// 修改商品
export const updateProductAC = (payload) => async (dispatch) => {
    const data = await categoryApi.updateProduct(payload)
    return data
}


// 获取商品列表
export const getProductAC = (payload) => async (dispatch) => {
    const data = await categoryApi.getProduct(payload)
    if (!data.status) {
      dispatch(getProductSC(data.data))  
    }
}

// 根据商品名字或描述搜索商品列表
export const getSearchProductAC = (payload) => async (dispatch) => {
    const data = await categoryApi.getSearchProduct(payload)
    if (!data.status) {
      dispatch(getProductSC(data.data))  
    }
}

// 根据商品名字或描述搜索商品列表
export const updateStatusAC = (payload) => async (dispatch) => {
    const data = await categoryApi.updateStatus(payload)
    return data
}
