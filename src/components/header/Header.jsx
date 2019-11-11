import React, { Component } from 'react'
import {reqWeather} from '../../api'
import './Header.less'
export default class Header extends Component {

state={

  data:{}

}

getWeather= async ()=>{
  
   const data=await reqWeather('广州')

   this.setState({
     data
   })

}

 componentDidMount(){
      this.getWeather()
  }

  render() {
    // 所有的数据都需要在render函数中读取出来才能渲染
    const {data} =this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>
            欢迎，admin
          </span>
          <a href="">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
             <span>首页</span>
          </div>
          <div className="header-bottom-rigth">
            <span>{data.date}</span>
            <img src={data.dayPictureUrl} />
            <span>{data.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
