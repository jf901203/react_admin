import React, { Component } from 'react'
import { Card,Select,Input,Icon,Table,Button, message} from 'antd';

import LinkButton from '../../../../components/link-button/LinkButton'
import {reqProduct,reqSearchName,reqUpdateStatus} from '../../../../api'
import {PAGE_SIZE} from '../../../../utils/constants'
const { Option } = Select
export default class ProductHome extends Component {

 

  state={
  list: [],
  total:0,
  loading:false,
  searchType:'productName',
  searchName:''
  }

// 更新指定商品的状态
  handleStatus=async (status,record)=>{
    // 收集数据
     const productId=record._id
    //  发送请求
     const result = await reqUpdateStatus({productId,status})
    //  判断结果
     if(result.status===0){
       message.success('更新成功')
       this.getProducts(this.pageNum)
     }else{
       message.error('更新失败')
     }

  }


// 初始化列的字段

initColumns=()=>{
//  把数据存到组件对象上
  this.columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
     
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price) => '￥' + price,
    },
    {
      title: '状态',
      dataIndex: '',
      // record 当前渲染行的对象
      render: (record) => <span>
          
          {
            record.status=== 1 ?
            <span> <Button type="primary" onClick={()=>{this.handleStatus(0,record)}}>下架</Button> <span>在售</span></span>:
            <span> <Button type="danger" onClick={()=>{this.handleStatus(1,record)}}>上架</Button> <span>已下架</span></span>
          }
        
        
        </span>,
    },
    {
      title: '操作',
      dataIndex: '',
      render: (record) => <span>

        <LinkButton onClick={()=>{this.props.history.push('/product/detail',record)}}>详情</LinkButton>
        <LinkButton onClick={()=>{this.props.history.push({ pathname: "/product/update", state: { record } });}}>修改</LinkButton>
       
        </span>,
    },
  ];

}


// 显示列表有两种 按指定名称搜索显示分页 一般分页

getProducts= async(pageNum)=>{
  // 把当前页保存到当前组件对象上 让其他方法可以看的见
  this.pageNum=pageNum
  // 显示loading
  this.setState({
    loading:true
  })

  const {searchType,searchName} =this.state
  // 根据名称/描述的分页
  let res
  if(searchName){
   res = await reqSearchName({pageNum,pageSize:PAGE_SIZE,searchType,searchName})
  }else{
    // 一般的分页
    res = await reqProduct(pageNum,PAGE_SIZE)
  }

//  发送请求
  
  //  请求成功
   if(res.status===0){
    const {list,total}=res.data
    // 隐藏loading
    this.setState({
      loading:false,
      list,
      total
    })
   }else{


   }
}

addProduct=()=>{
  this.props.history.push('/product/productadd')
}

componentWillMount(){
  this.initColumns()
}

componentDidMount(){
  this.getProducts(1)
}
  render() {

    const {searchType,searchName,total}=this.state
    const title=(
      <span>


        <Select value={searchType} onChange={value=>this.setState({searchType:value})}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" 
          style={{width:150,margin:'0 15px'}} 
          value={searchName}
          onChange={e=>this.setState({searchName:e.target.value})}
         
        />


        <Button type="primary" onClick={()=>{this.getProducts(1)}}>提交</Button>
      </span>

 
    )


    const extra=(
       <Button type="primary" onClick={this.addProduct}>
         <Icon type="plus"></Icon>
         添加
       </Button>
    )
   
    const list=this.state.list
    const dataSource =list
    const loading =this.state.loading
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table 
            dataSource={dataSource}
            columns={this.columns}
            bordered
            rowKey="_id"
            pagination={{
              current: this.pageNum,
              pageSize:3,
              showQuickJumper:true,
              total:total,
              loading:{loading},
              onChange:(page)=>{
                // 当前page就是点击时的当前页
                // 根据当前页再发送请求
                this.getProducts(page)
              }
            }}
          />
        </Card>
      </div>
    )
  }
}
