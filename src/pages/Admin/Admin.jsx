import React, { Component } from 'react'
import { Layout } from 'antd'
import {Redirect} from 'react-router-dom'
import memery from '../../utils/memeryUtil'
import LeftNav from '../../components/left-nav/LeftNav'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

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
          <Content style={{backgroundColor:'#fff'}}>Content</Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    )
  }
}
