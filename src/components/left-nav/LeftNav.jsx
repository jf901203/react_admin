import React, { Component } from 'react'


import { Layout, Menu, Breadcrumb, Icon } from 'antd';


import './LeftNav.less'
import logo from './img/logo.jpg'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
         <header className="left-nav-header">
           <img src={logo} alt="logo"/>
           <h1>MR.GAO后台</h1>
         </header>
         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      
            <Menu.Item key="1">
              <Icon type="home" />
              首页
            </Menu.Item>
    
            <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="user" />
                    <span>商品</span>
                  </span>
                }
              >
                <Menu.Item key="3">
                <Icon type="apartment" />
                  品类管理
                </Menu.Item>
                <Menu.Item key="4">
                <Icon type="branches" />
                  商品管理
                </Menu.Item>
                
            </SubMenu>
            <Menu.Item key="6">
            <Icon type="user" />
              用户管理
            </Menu.Item>
            <Menu.Item key="7">
            <Icon type="slack" />
              角色管理
            </Menu.Item>
            <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="area-chart"/>
                    <span>图形图表</span>
                  </span>
                }
              >
                <Menu.Item key="8">
                <Icon type="bar-chart" />
                  柱形图
                </Menu.Item>
                <Menu.Item key="9">
                <Icon type="line-chart" />
                  折线图
                </Menu.Item>
                <Menu.Item key="10">
                <Icon type="pie-chart" />
                  饼图
                </Menu.Item>
            </SubMenu>

          </Menu>
      </div>
    )
  }
}
