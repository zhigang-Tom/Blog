import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Header from '../components/Header'
// import Author from '../components/Author'
// import Advert from '../components/Advert'
// import Footer from '../components/Footer'
import { Row, Col, List, Icon, Affix, Spin } from 'antd'
import '../public/style/pages/index.css'
import servicePath from '../config/apiUrl'
const Home = (data) => {
  const [articlelist, setArticlelist] = useState(data.list)
  const [loading, setLoading] = useState(false)
  const goLoading = () => {
    setLoading(true);
  };
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return (
    <>
      <Head>
        <title>博客</title>
        <meta name="description" content="博客"></meta>
        <link
          rel="icon"
          href="favicon.ico"
          mce_href="favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <Affix offsetTop={0}>
        <Header/>
      </Affix>
      <Row className='comm-main' type='flex' justify='center'>  
        <Col xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="comm-left">
          <Spin spinning={loading}>
            <List
              header={<div className="list-header">最新日志</div>}
              itemLayout="vertical"
              dataSource={articlelist}
              renderItem={item => (
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
              )}
            />
            </Spin>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
          {/* 待处理 */}
          {/* <Author/>
          <Advert/> */}
        </Col>
      </Row>
    </>
  )
}
Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}
export default Home
