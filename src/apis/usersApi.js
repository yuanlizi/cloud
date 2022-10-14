import axios from "axios"


export default {
    // 登录
    login(data) {
        return axios({
            url: '/login',
            method: "post",
            data
        })
    }
}