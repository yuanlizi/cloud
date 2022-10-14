import { Layout } from 'antd';
import React from 'react';
import Nav from '../../components/Left-nav/index'
import Header from '../../components/Header/index'
const { Footer, Sider, Content } = Layout;
export default function index() {
  return (
    <div className='home'>
      <Layout>
        <Sider>
          <Nav />
        </Sider>
        <Layout>
          <Header />
          <Content className='content'>Content</Content>
          <Footer className='footer'>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
