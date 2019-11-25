// 修改组件 默认显示功能

import React, { Component } from 'react'
import { 
  Card,
  Icon, 
  Form,
  Input,
  Cascader,
  Button
  } from 'antd'

import LinkButton from '../../../../components/link-button/LinkButton'
import {reqCategory,reqAddProduct} from '../../../../api'
import PicturesWall from './picturesWall'
import RichTextEditor from './RichTextEditor'

const { TextArea } = Input;

export default class ProductUpdate extends Component {
  constructor(props){
    super(props)
    this.pictures=React.createRef()
  }
  state={
    options:[]
  }
 
// 数据改变时发送请求
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    const res= await reqCategory(targetOption.value)
    targetOption.loading = false;
    if(res.status===0){
      const subCategorys=res.data
      if(subCategorys && subCategorys.length>0){
        const childrenOptions=subCategorys.map(item=>({
          label:item.name,
          value:item._id,
          isLeaf:true
        }))
        targetOption.children =childrenOptions;
      }else{
        targetOption.isLeaf = true
      }
    }
    
    // load options lazily
      
      this.setState({
        options: [...this.state.options],
      });
    
  };

  // 获取分类列表

  // 获取一级分类列表
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

  // 获取二级分类列表

  getSubCategory=async ()=>{
    const {pCategoryId}=this.product
    if(pCategoryId!=="0"){
      const res=await reqCategory(pCategoryId)
         if(res.status===0){
            const subCategorys=res.data
            const childrenOptions=subCategorys.map((item)=>({
              label:item.name,
              value:item._id,
              isLeaf:true
            }))
          
         const {options} =this.state
         const targetOption=options.find((item)=>{return item.value===pCategoryId})
         targetOption.children = childrenOptions
        //  更新状态
         this.setState({
          options
        })

         }
     

    }

  }

componentWillMount(){
  this.getCategory('0')
  const product=this.props.location.state.record
  this.product=product || {}
  this.getSubCategory()
  
  

}


handleSubmit=()=>{
 
  const imgs=this.pictures.current.getImgs()

  console.log(imgs)
  

}

  render() {

    const {product}=this
    const {categoryId,pCategoryId,imgs}=product

   
    const categoryIds=[]
    if(pCategoryId==='0'){
      categoryIds.push(categoryId)
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
              <PicturesWall imgs={imgs} ref={this.pictures}></PicturesWall>
          </Form.Item>

          <Form.Item label="商品详情" hasFeedback labelCol={{span: 2}} wrapperCol={{span: 20}}>
              <RichTextEditor></RichTextEditor>
          </Form.Item>
          <Form.Item>
              <Button type="primary" onClick={this.handleSubmit}>提交</Button>
          </Form.Item>
        </Form>
        
        </Card>
      </div>
    )
  }
}
