import React, { Component } from 'react'
import { Form ,Input,Select } from 'antd';
import PropTypes from 'prop-types'
const { Option } = Select;
class AddForm extends Component {

  static propTypes={
    roles:PropTypes.array.isRequired,
    getForm:PropTypes.func.isRequired,
    role:PropTypes.object
  }
  getOptionNode=()=>{
    const {roles}=this.props
    return roles.map((item)=>{
      return(
        <Option value={item._id} key={item._id}>{item.name}</Option>
      )
    })
  }
  componentWillMount(){
    // 把form对象传递给组件
    this.props.getForm(this.props.form)
  }
  // 监视props属性的改变
  componentWillReceiveProps(nextProps){

  }

  render() {
    const {getFieldDecorator}=this.props.form
    // 可能是  role undefind
    const role=this.props.role || {}
    return (
      <div>
        <Form 
					labelCol={{ span: 5 }} 
					wrapperCol={{ span: 12 }}
					
        >
         <Form.Item label="用户名">
         {getFieldDecorator('username',{
          rules:[
            {required:true,message:'用户名'}
          ],
          initialValue:role.username

         })(<Input placeholder="请输入用户名"/>)}
          
        </Form.Item>


       {

         role._id ? null : (
          <Form.Item label="密码">
           
          {getFieldDecorator('password',{
            rules:[
              {required:true,message:'密码'}
            ],
            initialValue:''
         })(<Input placeholder="请输入密码" type="password"/>)}

        </Form.Item>
         )
       }


        <Form.Item label="手机号">
           {getFieldDecorator('phone',{
            initialValue:role.phone
         })(<Input placeholder="请输入手机号"/>)}
        </Form.Item>
        <Form.Item label="邮箱">
           {getFieldDecorator('email',{
           initialValue:role.email
         })(<Input placeholder="请输入邮箱地址"/>)}
        </Form.Item>
        <Form.Item label="角色">
            {getFieldDecorator('role_id',{
              initialValue:role.role_id
            })(<Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择角色"
              optionFilterProp="children"
            >
              {this.getOptionNode()}
            
            </Select>)}
        
        </Form.Item>
       

        </Form>
      </div>
    )
  }
}


export default Form.create()(AddForm);