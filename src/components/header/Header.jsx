import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal, Button } from 'antd';


import {reqWeather} from '../../api'
import './Header.less'
import menu from '../../menuConfig/menuList'
import memery from '../../utils/memeryUtil'
import store from '../../utils/localStorage'
import moment from '../../utils/dateUtil'
const { confirm } = Modal;
class Header extends Component {

state={
  data:{},
  times:Date.now()
}
getSetTime=()=>{
  setInterval(()=>{
    const times=Date.now()
   
    this.setState({
      times
    })
  },1000)
}
getWeather= async ()=>{
  
   const data=await reqWeather('广州')
   this.setState({
     data
   })

}

getTitle=(menu)=>{
const path=this.props.location.pathname
// 用一个变量
let title
  menu.find((item)=>{
    if(!item.children){
      title=item.title
    }else{
      const cItem=item.children.find((cItem)=>{
        return cItem.key===path
      })
     if(cItem){
      title=cItem.title
     }
    }
  })

  return title

}

showPropsConfirm=()=> {

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
componentWillMount(){
  
}
 componentDidMount(){
      this.getWeather() 
      // 启动循环定时器 是异步操作 必须在这个钩子这里做
      this.getSetTime()
  }
  render() {
    // 所有的数据都需要在render函数中读取出来才能渲染
    const {data,times} =this.state
    const date=moment(times)
    const {username}=memery.user
    const title=this.getTitle(menu)

    return (
      <div className="header">
        <div className="header-top">
          <span>
            欢迎，{username}
          </span>
          <Button onClick={this.showPropsConfirm}>退出</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
    <span>{title}</span>
          </div>
          <div className="header-bottom-rigth">
            <span>{date}</span>
            <img src={data.dayPictureUrl} />
            <span>{data.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Header)