import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
// import Footer from '../components/Footer'
import { Row, Col, List, Icon, Breadcrumb, Spin, Affix } from 'antd'
import '../public/style/pages/index.css'
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../config/apiUrl'
const ListPage = (props) => {
  const [problemlist, setProblemlist] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setProblemlist(props.data)
  })
  const goLoading = () => {
    setLoading(true)
  }
  return (
    <>
      <Head>
        <title>问题列表</title>
      </Head>
      <Affix offsetTop={0}>
        <Header/>
      </Affix>
      <Row className='comm-main' type='flex' justify='center'>  
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>问题列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Spin spinning={loading}>
            <List
              itemLayout='vertical'
              dataSource={problemlist}
              renderItem={
                item => ( 
                  <List.Item>
                    <div className="list-title" onClick={goLoading}>
                      <Link href={{ pathname: "/detail", query: { id: item.id } }}>
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span>
                        <Icon type="calendar"/> {item.addTime}
                      </span>
                      <span>
                        <Icon type="folder"/> {item.typeName}
                      </span>
                    </div>
                    <div
                      className="list-context"
                      dangerouslySetInnerHTML={{ __html: item.introduce_html }}
                    ></div>
                    <div className="list-go">
                      <Icon type="file" /> &nbsp;
                      <span onClick={goLoading} onClick={goLoading}>
                        <Link href={{ pathname: "/detail", query: { id: item.id }}}>
                          <a>查看全文 </a>
                        </Link>
                      </span>
                    </div>
                </List.Item>
                )
              }
            />
          </Spin>
        </Col>
        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
          <Author/>
          <Advert/>
        </Col>
      </Row>
    </>
  )
}
ListPage.getInitialProps = async (context) => {
  const id = context.query.id
  
  const promise = new Promise((resolve) => {
    axios(`${servicePath.getListById}${id}`).then(
      (res) => {
        console.log('list.data', res.data)
        return resolve(res.data)
      }
    )
  })
  return await promise
}
export default ListPage
