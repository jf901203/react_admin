// 修改组件 默认显示功能

import React, { Component } from 'react'
import { 
  Card,
  Icon, 
  Form,
  Input,
  Cascader
  } from 'antd'

import LinkButton from '../../../../components/link-button/LinkButton'
import {reqCategory,reqAddProduct} from '../../../../api'
const { TextArea } = Input;

export default class ProductUpdate extends Component {
 
  state={
    product:null,
    options:[]
  }
 

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    const res= await reqCategory(targetOption.value)
    console.log(res)
    
    // load options lazily
      targetOption.loading = false;
      targetOption.children = [];
      this.setState({
        options: [...this.state.options],
      });
    
  };

  // 获取分类列表

  getCategory=async (category)=>{
    const res= await reqCategory(category)
    if(res.status===0){
      const categorys=res.data
      const options=categorys.map((item)=>({value:item._id,label:item.name,isLeaf:false}))  
      this.setState({
        options
      })

    }

  }

componentWillMount(){

  this.getCategory('0')
  const product=this.props.location.state.record
  this.setState({
    product
  })

}

  render() {

    const {product}=this.state || {}
    const {categoryId,pCategoryId}=product
    const categoryIds=[]
    if(pCategoryId==='0'){
      categoryIds.push(pCategoryId)
    }else{
      categoryIds.push(pCategoryId)
      categoryIds.push(categoryId)

    }

    const title=(
      <span>
        <LinkButton onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left" style={{margin:'0px 5px'}} />修改商品</LinkButton>
      </span>
    )

    return (
      <div>
        <Card  title={title} style={{ width: '100%'}}>
        
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 8 }}>

          <Form.Item label="商品名称" hasFeedback>
              <Input  defaultValue={product.name}/>
          </Form.Item>
          <Form.Item label="商品价格" hasFeedback>
              <Input addonAfter="元" defaultValue={product.price}/>
          </Form.Item>
          <Form.Item label="商品描述" hasFeedback>
             
              <TextArea autoSize={{ minRows: 2, maxRows: 10 }} defaultValue={product.desc}/>
          </Form.Item>
          <Form.Item label="商品分类" hasFeedback>
          <Cascader
            defaultValue={categoryIds}
            options={this.state.options}
            loadData={this.loadData}
           
            changeOnSelect
          />
          </Form.Item>
          <Form.Item label="上传图片" hasFeedback>
              <Input />
          </Form.Item>

          <Form.Item label="商品详情" hasFeedback>
              <Input />
          </Form.Item>
        </Form>
        
        </Card>
      </div>
    )
  }
}
