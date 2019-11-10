import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {  Menu, Icon } from 'antd';

import menuList from '../../menuConfig/menuList'
import './LeftNav.less'
import logo from './img/logo.jpg'

const { SubMenu } = Menu;




 class LeftNav extends Component {
// 根据数据数组生成标签数组 map()高阶函数需要 return
  getMenuNode=(menuList)=>{
    return menuList.map((item)=>{
      if(!item.children){
        return(
          <Menu.Item key={item.key}>
               <Link to={item.key}>
                <Icon type={item.type} />
                  {item.title}
              </Link>
            </Menu.Item>
        )
      }else{
        return (
          <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.type} />
              <span>{item.title}</span>
            </span>
          }
        >
         
         {
        
          // 递归调用
          this.getMenuNode(item.children)
        
        }
          
      </SubMenu>
        )
      }

    })
  
  }


  render() {
    const path=this.props.location.pathname
    return (
      <div className="left-nav">
         <header className="left-nav-header">
           <img src={logo} alt="logo"/>
           <h1>MR.GAO后台</h1>
         </header>
         <Menu theme="dark" selectedKeys={[path]} mode="inline">
      
            {
              this.getMenuNode(menuList)
            }

          </Menu>
      </div>
    )
  }
}
// 让一个非路由组件变成一个路由组件
export default withRouter(LeftNav)