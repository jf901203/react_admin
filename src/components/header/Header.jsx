import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';

import LinkButton from '../link-button/LinkButton'
import {reqWeather} from '../../api'
import menu from '../../menuConfig/menuList'
import memery from '../../utils/memeryUtil'
import store from '../../utils/localStorage'
import moment from '../../utils/dateUtil'
import './Header.less'

const { confirm } = Modal;
class Header extends Component {

state={
  data:{},
  times:moment(Date.now())
}
// 当前时间
getSetTime=()=>{
  this.setId=setInterval(()=>{
    const times=moment(Date.now())
   
    this.setState({
      times
    })
  },1000)
}
// 天气
getWeather= async ()=>{
  
   const data=await reqWeather('广州')
   this.setState({
     data
   })

}

// 标题
getTitle=(menu)=>{
const path=this.props.location.pathname
// 用一个变量
let title
  menu.forEach((item)=>{
    if(item.key===path){
      title=item.title
    }else if(item.children){
      const cItem=item.children.find((cItem)=>{
        return path.indexOf(cItem.key)===0
      })
     if(cItem){
      title=cItem.title
     }
    }
  })

  return title

}

// 退出登入
showPropsConfirm=()=> {
  // 显示确认框
  confirm({
    title: '确定退出吗?',
    okText: '确认',
    okType: 'danger',
    cancelText: 'No',
    onOk:() =>{
      // 删除本地缓存
      store.removeUser()
      memery.user={}
      // 跳转到登入页面
      this.props.history.replace('/login')

    }
  });
}

// 执行异步的钩子函数
 componentDidMount(){
      this.getWeather() 
      // 启动循环定时器 是异步操作 必须在这个钩子这里做
      this.getSetTime()
  }

  // 当前组件鞋卸载之前 把定时器清除

  componentWillUnmount(){

    clearInterval(this.setId)

  }


  render() {
    // 所有的数据都需要在render函数中读取出来才能渲染  数据从哪里来
    const {data,times} =this.state
    // 得到用户名
    const {username}=memery.user
    // 得到title
    const title=this.getTitle(menu)

    return (
      <div className="header">
        <div className="header-top">
          <span>
            欢迎，{username}
          </span>
          <LinkButton onClick={this.showPropsConfirm}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
    <span>{title}</span>
          </div>
          <div className="header-bottom-rigth">
            <span>{times}</span>
            <img src={data.dayPictureUrl} alt="qing"/>
            <span>{data.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Header)