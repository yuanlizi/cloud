import { createSlice } from "@reduxjs/toolkit"
import { message } from 'antd';
import categoryApi from '../apis/categoryApi';
export const categorySlice = createSlice({
    name: "users",
    initialState: {
        categoryList: [],
        categoryListTwo: []
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
    }
})
export const { getCategorySC, getCategoryTwoSC } = categorySlice.actions
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
