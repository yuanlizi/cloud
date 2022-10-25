import { createSlice } from "@reduxjs/toolkit"
import { message } from 'antd';
import usersApi from '../apis/usersApi';
export const usersSlice = createSlice({
    name: "users",
    initialState: {
        userInfo: {},
        title: ''
    },
    reducers: {
        getLoginUser: (state, action) => {
            state.userInfo = action.payload
        },
        setTitle: (state, action) => {
            state.title = action.payload
        }
    }
})
export const { getLoginUser, setTitle } = usersSlice.actions
export default usersSlice.reducer
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