import React, { useState, useEffect } from "react";
import "../static/css/ArticleList.css";
import { List, Row, Col, Modal, message, Button, Icon } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  //得到文章列表
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" }
    }).then(res => {
      setList(res.data.list);
    });
  };
  //删除文章的方法
  const delArticle = id => {
    confirm({
      title: "确定要删除这篇博客文章吗?",
      content: "如果你点击OK按钮，文章将会永远被删除，无法恢复。",
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          res => {
            message.success("文章删除成功");
            getList();
          }
        );
      },
      onCancel() {
        message.success("没有任何改变");
      }
    });
  };

  //修改文章
  const updateArticle = (id, checked) => {
    props.history.push("/index/add/" + id);
  };

  // //设置置顶
  // const setTop = (id, checked) => {
  //   let dataProps = {};
  //   dataProps.id = id;
  //   dataProps.isTop = checked ? 1 : 0;
  //   axios({
  //     method: "post",
  //     url: servicePath.updateIsTop,
  //     header: { "Access-Control-Allow-Origin": "*" },
  //     data: dataProps,
  //     withCredentials: true
  //   }).then(res => {
  //     if (res.data.data === "success") {
  //       message.success("置顶设置成功");
  //       getList();
  //     } else {
  //       message.error("设置失败");
  //     }
  //   });
  // };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={9}>
              <b>标题</b>
            </Col>
            <Col span={5}>
              <b>类别</b>
            </Col>
            <Col span={5}>
              <b>发布时间</b>
            </Col>
            <Col span={5}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={9}>{item.title}</Col>
              <Col span={5}>{item.typeName}</Col>
              <Col span={5}>{item.addTime}</Col>
              <Col span={5}>
                <Button
                  type="primary"
                  onClick={() => {
                    updateArticle(item.id);
                  }}>
                  <Icon type="edit"/>
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >
                  <Icon type="delete" />
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
