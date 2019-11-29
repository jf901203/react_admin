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
        const path=this.props.location.pathname
        // 查找一个与当前路由匹配的item
        const cItem=item.children.find((cItem)=>cItem.key===path)
        // 如果存在 说明当前子列表需要打开
        if(cItem){
          // 把一个属性保存到当前组件中
          this.openKey=item.key
        }
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

  // render()之前执行一次
  // 为 render()第一次渲染准备数据 (必须是同步的数据)
  // 在render()渲染函数执行之前把 虚拟DOM对象创建好
  componentWillMount(){
    this.MenuNode=this.getMenuNode(menuList)
  }
  
  render() {
    const path=this.props.location.pathname
    // 在this.getMenuNode(menuList)执行之后才能取得到
    const openKey=this.openKey
    return (
      <div className="left-nav">
         <header className="left-nav-header">
           <img src={logo} alt="logo"/>
           <h1>MR.GAO后台</h1>
         </header>
         <Menu theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]} mode="inline">
      
            {
             this.MenuNode
            }

          </Menu>
      </div>
    )
  }
}
// 让一个非路由组件变成一个路由组件
export default withRouter(LeftNav)