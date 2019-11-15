
// 添加分类
import React, { Component } from 'react'
import { Form,Input,Select, message} from 'antd';


import {reqCategory} from '../../../../api/index'
const { Option } = Select
class AddForm extends Component {

  state={
    categorys:[]
  }

  // 发送请求获取一级分类

  getCategoty= async()=>{

   const res=await reqCategory('0')

   if(res.status===0){

     const categorys=res.data
     
     this.setState({categorys})
   }else{
     message.error('请求错误!!!')
   }
  }
 
 

  // 发送异步请求获取数据

  componentDidMount(){
    this.getCategoty()
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const categorys=this.state.categorys
    return (
      <Form layout="horizontal">
        <Form.Item>
          {getFieldDecorator('parentId', {
              rules: [{ required: true, message: 'Please select your gender!' }],
              initialValue:"0"
            })(
              <Select
                placeholder="Select a option and change input text above"
              >
                <Option value="0">一级分类</Option>
              </Select>,
            )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('categoryName', {
              rules: [{ required: true, message: '请求输入分类名称!' }],
            })(
              <Input
                placeholder="Username"
              />
            )}
        </Form.Item> 
      </Form>
    )
  }
}

// 得到form对象
export default  Form.create()(AddForm)