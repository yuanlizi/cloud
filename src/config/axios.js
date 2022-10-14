import axios from "axios"
// 全局配置请求头地址
axios.defaults.baseURL = "/api"
// 请求
axios.interceptors.request.use(
    // 请求之前的回调函数
    // function config(config) {
    //     // 获得token
    //     config.headers = {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         // token: localStorage.getItem("token")
    //     }
    //     return config   
    // },
    // function(error) {
    //     return Promise.reject(error)
    // }
)
// 响应
// 添加相应拦截器
axios.interceptors.response.use(
    // 请求数据成功返回的结果
    function(response) {
        return response.data
    },
    // 请求数据失败返回的结果
    function(error) {
        //处理异常
        // switch (error.response.status) {
        //     case 401:
        //         window.location.pathname="/login"
        //         break
        //     case 404:
        //         message.error("地址不存在")
        //         break
        //     default:
        //         return response.data        
        // }
        return Promise.reject(error)
    }
)