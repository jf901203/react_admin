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

  validatorHandle=(rule, value, callback)=>{
    if(!value){
      callback('必填')
    }else if(value.length<4){
      callback('必须大于4位')
    }else if(value.length>12){
      callback('必须小于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('必须以数字、字母或下滑线开头')
    }else{
      // 验证通过的回调函数不能传参
      callback()
    }

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }


  render() {

    const form=this.props.form;
    const { getFieldDecorator } = form;
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
          {getFieldDecorator('username',{
           rules: [
             {required: true, message: '请输入用户名'},
             {min:4,message: '用户名最小为4位'},
             {max:14,message: '用户名最大为14位'}
          ],
          initialValue:'admin'
          })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />)}
            
        
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password',{
              rules: [
                {validator:this.validatorHandle}
             ],
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />)}
            
          
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