// 修改组件 默认显示功能

import React, { Component } from 'react'
import { 
  Card,
  Icon, 
  Form,
  Input,
  Cascader,
  Button,
  message
  } from 'antd'

import LinkButton from '../../../../components/link-button/LinkButton'
import {reqCategory,reqUpdateProduct} from '../../../../api'
import PicturesWall from './picturesWall'
import RichTextEditor from './RichTextEditor'

const { TextArea } = Input;

class ProductUpdate extends Component {
  constructor(props){
    super(props)
    this.pictures=React.createRef()
    this.editor=React.createRef()
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

validator=(rule, value, callback) => {
  if (value*1 <0) {
      callback('介个必须大于0')
  }
  callback()
}

// 提交表单
handleSubmit=()=>{
  
  // 收集数据
  const imgs=this.pictures.current.getImgs()
  const detail=this.editor.current.getEditorVal()
  const {_id}=this.product
  this.props.form.validateFields(async (errors, values)=>{
    
    const {name, desc, price, categoryIds} = values
    let pCategoryId,categoryId
    // 从数组中取出元素
    if(categoryIds.length===1){
      pCategoryId='0'
      categoryId=categoryIds[0]
    }else{
      pCategoryId=categoryIds[0]
      categoryId=categoryIds[1]
    }
    const product={
      _id,
      imgs,
      name,
      desc,
      price,
      pCategoryId,
      categoryId,
      detail
    }
     // 发送请求
    const result = await reqUpdateProduct(product)
    //根据返回结果判断
    if(result.status===0){
      message.success('更新成功')
      // 跳转页面
      this.props.history.replace('/product')
    }else{
      message.error('更新失败')
    }
  })
}

  render() {

    const {product}=this
    const {categoryId,pCategoryId,imgs}=product
    const categoryIds=[]
    // 往数组中添加元素
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
    // 双向数据绑定
    const {getFieldDecorator}=this.props.form

    return (
      <div>
        <Card  title={title} style={{ width: '100%'}}>
        
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 8 }}>

          <Form.Item label="商品名称" hasFeedback>
              {getFieldDecorator('name',{
                rules: [
                  {
                    required: true,
                    message: '请输入商品名称',
                  },
                ],
                initialValue:product.name
              })(<Input placeholder="请输入商品名称"/>)}
              
          </Form.Item>
          <Form.Item label="商品价格" hasFeedback>
          {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules: [
                  {required: true, message: '必须输入商品价格'},
                  {validator:this.validator}
                ]
              })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
            }
          </Form.Item>
          <Form.Item label="商品描述" hasFeedback>
               {getFieldDecorator('desc',{
                 rules: [
                  {
                    required: true,
                    message: '商品描述',
                  },
                ],
                initialValue:product.desc
               })(<TextArea autoSize={{ minRows: 2, maxRows: 10 }} />)}
              
          </Form.Item>
          <Form.Item label="商品分类" hasFeedback>

             {getFieldDecorator('categoryIds',{
               rules: [
                {required: true, message: '必须指定商品分类'},
              ],
              initialValue:categoryIds
             })(
             
             <Cascader
              options={this.state.options}
              loadData={this.loadData}
              changeOnSelect
            />)}
            
          </Form.Item>
          <Form.Item label="上传图片" hasFeedback>
              <PicturesWall imgs={imgs} ref={this.pictures}></PicturesWall>
          </Form.Item>

          <Form.Item label="商品详情" hasFeedback labelCol={{span: 2}} wrapperCol={{span: 20}}>
              <RichTextEditor detail={product.detail} ref={this.editor}></RichTextEditor>
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


export default Form.create({})(ProductUpdate)