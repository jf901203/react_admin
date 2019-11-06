import React, { Component } from 'react'
import { 
  Form, 
  Icon, 
  Input, 
  Button 
} from 'antd'

import './login.less'
import logo from './img/logo.jpg'
 class Login extends Component {


  handleSubmit=(event)=>{
    

    event.preventDefault()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" className="header-avatar"/>
          <h1 className="header-title">后台管理系统</h1>
        </header>
        <section className="login-content">
        <h1 className="content-title">用户登入</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
        
        </Form.Item>
        <Form.Item>
          
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          
        </Form.Item>
        <Form.Item>
          
         
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          
        </Form.Item>
      </Form>
        </section>
      </div>
    )
  }
}

// 暴露的是包装好的组件
const  WrapLogin = Form.create()(Login);
export default WrapLogin