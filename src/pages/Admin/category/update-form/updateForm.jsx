
// 更新分类
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form,Input} from 'antd';

 class UpdateForm extends Component {

 static propTypes ={
  categoryName:PropTypes.string.isRequired,
  setForm:PropTypes.func.isRequired
 }


 componentWillMount(){

  // 将form对象传递给父组件 子组件调用父组件的方法 把子组件的数据当做父组件的函数参数传递给父组件

  this.props.setForm(this.props.form)

 }


  render() {
    const categoryName=this.props.categoryName
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal">
        {
        getFieldDecorator('categoryName',{
          rules: [{ required: true, message: '请求输入分类名称' }],
          initialValue:categoryName
        })(
          <Input placeholder="请输入分类名称"></Input>
        )
        }
        
      </Form>
    )
  }
}

//向UpdateForm组件传递form对象
export default Form.create()(UpdateForm)