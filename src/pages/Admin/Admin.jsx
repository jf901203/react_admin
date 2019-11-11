import React, { Component } from 'react'
import { Layout } from 'antd'
import {Redirect,Switch,Route} from 'react-router-dom'


import memery from '../../utils/memeryUtil'
import LeftNav from '../../components/left-nav/LeftNav'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Home from './home/Home'
import Category from './category/Category'
import Line from './line/Line'
import Pie from './pie/Pie'
import Pillar from './pillar/Pillar'
import Role from './role/Role'
import User from './user/User'
import Product from './product/Product'

const {  Sider, Content } = Layout


export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    
    const {user}=memery
  
    if(!user || !user._id){
      return (
        <Redirect to="/login"></Redirect>
      )
    }

    return(
      <Layout style={{height:'100%'}}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{backgroundColor:'#fff'}}>
            
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/pillar" component={Pillar}></Route>
              <Route path="/line" component={Line}></Route>
              <Route path="/pie" component={Pie}></Route>
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    )
  }
}
