import React, { Component } from 'react'
import { Card,Button,Table,Icon} from 'antd'


import LinkButton from '../../../components/link-button/LinkButton'
import {reqCategory} from '../../../api/index'



import './Category.less'
export default class Category extends Component {

  state={
    categorys:[], //一级分类
    subCategorys:[],//二级分类
    loading:false,
    name:'', // 一级分类的名称
    parentId:'0'

  }

  subCategory=(record)=>{
   
    const {name,_id}=record
    console.log(name)
    
    
  }

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
        categorys,
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


column=()=>{
  
 return this.columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width:300,
      dataIndex: 'age',
      render: (text, record, index) => (
        <span>
          <LinkButton>修改分类</LinkButton>
          
          <LinkButton onClick={()=>this.subCategory(record)}>查看子分类</LinkButton>
        
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

  const title='一级分类列表'
  const extra=(
    <Button type="primary"><Icon type="plus" />添加</Button>
  )
  const {categorys,loading}=this.state
  
    return (
      <div className="category-container">
        
        <Card size="small" title={title} extra={extra} className="category" >
            <Table 
            dataSource={categorys} 
            columns={this.columns}
            loading={loading}
            bordered pagination={{defaultPageSize:5,showQuickJumper:true}}
             />
        </Card>
      </div>
    )
  }
}
