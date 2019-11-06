/*
  应用的根组件
  自定义模块会有相对路径的关系
  第三模块没有相对路劲的关系
*/ 
import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'
export default class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
