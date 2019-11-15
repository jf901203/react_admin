import React, { Component } from 'react'
import { Card,Button,Table,Icon,Modal, message } from 'antd'


import LinkButton from '../../../components/link-button/LinkButton'
import {reqCategory,reqUpdateCategorye} from '../../../api/index'
import AddForm from './add-form/AddForm'
import UpdateForm from './update-form/updateForm'
 
import './Category.less'
export default class Category extends Component {

  state={
    categorys:[], //一级分类
    subCategorys:[],//二级分类
    loading:false,
    parentName:'', // 一级分类的名称
    parentId:'0',
    visible: 0 // 0 都不显示 1添加显示 2 更新显示
  
  }

  // 显示指定一级分类对象的二级列表
  subCategory=(record)=>{
   
    const {name,_id}=record
    
    this.setState({parentId:_id,parentName:name},()=>{
      
      // 获取二级分类列表
      this.getCategory()

    })
    
    
  }

  // 发送请求获取一级/二级列表
getCategory=async ()=>{
  
  // 在发送请求前显示loading

   this.setState({
    loading:true
   })
  
   const {parentId}=this.state
  
   const res=await reqCategory(parentId)

   if(res.status===0){
     
    const categorys = res.data
    if(parentId==="0"){
      this.setState({
        categorys:categorys,
        loading:false
      })
    }else{
      this.setState({
        subCategorys:categorys,
        loading:false
      })
    }
    
   }

}

// 返回一级列表
backLink=()=>{
   
  // 更新为显示一级列表的状态

  this.setState({
    parentId:'0',
    parentName:'',
    subCategorys:[]
  })

}


// 获取子组件向父组件传递的form对象
setForm=(form)=>{

  this.form=form
}


//显示更新确认框
showUpdate=(record)=>{
 
  
  this.category=record 
 

  this.setState({
    visible: 2,
    
  })

}

// 确认更新
handleUpdateOk= async()=>{

// 发送请求修改类名
const categoryId=this.category._id

const categoryName=this.form.getFieldValue('categoryName')
// 清除输入数据
this.form.resetFields()
const data={
  categoryId,
  categoryName
}

// 发送请求更新类名
const res=await reqUpdateCategorye(data)

if(res.status===0){
  message.success('内容已经更新')
  // 重新显示列表
  this.getCategory()

}else{
  message.success('内容更新失败')
}


  // 隐藏确认框
  this.setState({
    visible: 0
  })
}

// 显示添加确认框
showAdd=()=>{
  this.setState({
    visible: 1
  })
}
//添加分类
addCategory=()=>{
  this.setState({
    visible: 0
  })
}


// 取消确认框
handleCancel=()=>{
  this.form.resetFields()
  this.setState({
    visible: 0
  })
}


column=()=>{
  
  return this.columns = [
     {
       title: '分类名称',
       dataIndex: 'name',
     },
     {
       title: '操作',
       width:300,
       render: (text, record, index) => (
         <span>
           <LinkButton onClick={()=>{this.showUpdate(record)}}>修改分类</LinkButton>
           {
             this.state.parentId==='0'? <LinkButton onClick={()=>this.subCategory(record)}>查看子分类</LinkButton>:null
           }
          
         
         </span>
       ),
     }
   ]
 
 }

//同步执行的钩子函数  在render()函数执行之前把数据准备好

componentWillMount(){
  this.columns=this.column()
}

// 异步操作的钩子函数 只执行一遍
componentDidMount(){

 this.getCategory()
}

  render() {
  //  获取渲染的输数据/自己定义
  const {categorys,loading,subCategorys,parentId,parentName}=this.state
  const categoryName=this.category|| {}

  const title=parentId==='0'?'一级分类列表':(
    <span>
      <LinkButton onClick={this.backLink}>一级分类列表</LinkButton>
      <Icon type="arrow-right" style={{margin:'0px 5px'}}/>
      <span>{parentName}</span>
    </span>
  )
  const extra=(
    <Button type="primary" onClick={this.showAdd}>
      <Icon type="plus" />添加
    </Button>
  )
  
  const {visible}=this.state

  
    return (
      <div className="category-container">
        <Card size="small" title={title} extra={extra} className="category" >
            <Table 
            dataSource={parentId==="0"?categorys:subCategorys} 
            columns={this.columns}
            loading={loading}
            bordered pagination={{defaultPageSize:5,showQuickJumper:true}}
             />
        </Card>

        <Modal
          title="添加分类"
          visible={visible===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          >
          <AddForm></AddForm>
        </Modal>

        <Modal
          title="更新"
          visible={visible===2}
          onOk={this.handleUpdateOk}
          onCancel={this.handleCancel}
          >

         <UpdateForm categoryName={categoryName.name} setForm={(form)=>{this.setForm(form)}}></UpdateForm>


        </Modal>


      </div>
    )
  }
}
