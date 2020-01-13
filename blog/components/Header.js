import React from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'
import Router from 'next/router'
// import axios from 'axios'
// import servicePath from '../config/apiUrl'
// import Link from 'next/link'
const Header =() => {
  const handlePush = (e) => {
    if (e.key == 'Home') {
      Router.push('/index')
    } else if (e.key == 'Problem') {
      Router.push(`/list?id=5`)
    }
  }
  return (
    <div className='header'>
      <Row type='flex' justify='center'>
      {/* xs={24} sm={24} md={10} lg={15} xl={12} */}
        <Col xs={24} sm={24} md={16} lg={18} xl={14}>
          <span className='header-logo'>山涧树</span>
          <span className='header-txt'>专注前端开发，热爱新技术</span>
        </Col>
        {/* xs={0} sm={0} md={14} lg={8} xl={6} */}
        <Col className='mune-div' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Menu mode='horizontal' onClick={handlePush}>
            <Menu.Item key="Home">
              <Icon type="home"/>
              博客首页
            </Menu.Item>
            <Menu.Item key="Problem">
              <Icon type="medicine-box"/>
              问题总结
            </Menu.Item>
          </Menu> 
        </Col>
      </Row>
    </div>
  )
}

export default Header
