import React, { Component } from 'react'
import { Card,
  Form, 
  Input, 
  Button, 
  Upload, 
  Icon, 
  message,
  Cascader 
} from 'antd';

import {reqCategory} from '../../../../api'

import LinkButton from '../../../../components/link-button/LinkButton'
import './add.less'

const { TextArea } = Input

 class ProductAdd extends Component {

  /*组件自身的诸状态*/

  state={
    options:[]
  }


/*自定义函数*/ 


initOptions=(categorys)=>{

  const options=categorys.map(item=>(
    {
      value: item._id,
      label: item.name,
      isLeaf: false,
    }
  ))

this.setState({
  options
})

}


/*

处理事件回调

*/ 
  submit=()=>{
    this.props.form.validateFields((errors, values)=>{
      if(!errors){
        alert(values)
      }
    })
  }
// 自定义验证规则
  validatorPrice=(rule, value, callback)=>{

    if(value*1>0){
      callback()
    }else{
      callback('价格不能小于0')
    }
  }
//  级联选择
  onChange=(value)=> {
    console.log(value);
  }

/*
  处理请求
*/ 

getCategory= async ()=>{
  
  const res=await reqCategory('0')
    
  if(res.status===0){
    const categorys=res.data
    this.initOptions(categorys)
  }else{

   message.error('请求错误')

  }
   
}


/*

组件钩子

*/

componentDidMount(){

  this.getCategory()

}


  render() {

   const options=this.state.options
    const { getFieldDecorator } = this.props.form;
    const title=(
      <span>
        
        <LinkButton>
           <Icon type="arrow-left" />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )
    return (
      <div className="add">
        <Card title={title} style={{ width: '100%' }}>
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 8}}>
          

          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入商品名称' }],
            })(<Input placeholder="请输入商品名称"/>)}

            </Form.Item>
        
            <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              rules: [
                { required: true, message: '商品价格' },
                {validator:this.validatorPrice}
              ],

            })(<Input addonAfter='元' type="number"/>)}

            </Form.Item>
          
          
            <Form.Item label="商品描述">
            {getFieldDecorator('detail', {
              rules: [{ required: true, message: '商品描述' }],
            })(<TextArea
              placeholder="商品描述"
              autoSize={{ minRows: 2, maxRows: 10 }}
            />)}

            </Form.Item>

         
          <Form.Item label="商品分类">
            
          <Cascader
              options={options}
              onChange={this.onChange}
              changeOnSelect
            />
          </Form.Item>
          <Form.Item label="图片上传">
          <Upload>
            
          </Upload>
          </Form.Item>
          <Form.Item label="图片上传">
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Form.Item>
        </Form>
        </Card>
      </div>
    )
  }
}


export default  Form.create()(ProductAdd);