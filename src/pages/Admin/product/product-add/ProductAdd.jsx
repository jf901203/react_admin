import React, { Component } from 'react'
import { Card,
  Form, 
  Input, 
  Button, 
  Icon, 
  message,
  Cascader 
} from 'antd';

import {reqCategory} from '../../../../api'
import PicturesWall from './PicturesWall'
import RichTextEditor from './RichTextEditor'

import LinkButton from '../../../../components/link-button/LinkButton'
import './add.less'

const { TextArea } = Input

 class ProductAdd extends Component {


  constructor(props){
    super(props)
    this.Editor=React.createRef()

  }
  

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
       const {categoryIds} =values
       const imgs=this.PicturesWall.getImgs()
       const detail=this.Editor.current.getEditor()
       
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


/*
  处理请求
*/ 

getCategory= async (parentId)=>{
  const res=await reqCategory(parentId)
  if(res.status===0){
    const categorys=res.data
    if(parentId==='0'){
      // 如果是一级分类
      this.initOptions(categorys)
    }else{
      // 返回二级列表数据
     return  categorys
    }
  }else{
   message.error('请求错误')
  }
   
}


/*
组件钩子
*/

componentDidMount(){
  this.getCategory('0')
}

loadData = async selectedOptions => {
  // 获取option对象 
  const targetOption = selectedOptions[0];
  targetOption.loading = true;

  const subCategorys= await this.getCategory(targetOption.value)

  if(subCategorys && subCategorys.length > 0){
    targetOption.loading = false
    const childrenOption= subCategorys.map((item)=>({
        label: item.name,
        value: item._id,
        isLeaf:true
    }))
    targetOption.children = childrenOption
  }else{

    targetOption.loading = false
    // 没有二级列表了 就是叶子了
    targetOption.isLeaf=true

  }

    this.setState({
      options: [...this.state.options],
    });

  }



  render() {

   const options=this.state.options
    const { getFieldDecorator } = this.props.form;
    const title=(
      <span>
        
        <LinkButton onClick={()=>{this.props.history.goBack()}}>
           <Icon type="arrow-left" />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )
    return (
      <div className="add">
        <Card title={title} style={{ width: '100%' }}>
        <Form labelCol={{ span: 3 }} wrapperCol={{ span:8}}>
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

          {getFieldDecorator('categoryIds', {
              initialValue:[],
              rules: [{ required: true, message: '商品分类' }],
            })( <Cascader
              options={options}
              loadData={this.loadData}
              changeOnSelect
              placeholder="商品分类"
            />)}

           
          </Form.Item>
          <Form.Item label="图片上传">
             <PicturesWall ref={(PicturesWall)=>{this.PicturesWall=PicturesWall}}></PicturesWall>
          </Form.Item>
          <Form.Item label="商品详情" labelCol={{ span: 3 }}  wrapperCol={{ span:20}}>
              <RichTextEditor ref={this.Editor}></RichTextEditor>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Form.Item>
        </Form>
        </Card>
      </div>
    )
  }
}


export default  Form.create()(ProductAdd);