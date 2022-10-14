import React from 'react'
import { BrowserRouter } from "react-router-dom"
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import "./assets/styles/index.less"
import Router from "./router/index"
import { store } from "./store/index"
import { Provider } from "react-redux"
function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <React.Suspense fallback={<div>加载中...</div>} >
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </React.Suspense>
      </ConfigProvider>
    </Provider>

  )
}

export default App

