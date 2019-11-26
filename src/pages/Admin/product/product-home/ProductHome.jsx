import React, { Component } from 'react'
import { Card,Select,Input,Icon,Table,Button} from 'antd';

import LinkButton from '../../../../components/link-button/LinkButton'
import {reqProduct} from '../../../../api'
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
            record.status===1 ?
            <span> <Button type="primary">下架</Button> <span>在售</span></span>:
            <span> <Button type="danger">上架</Button> <span>已下架</span></span>
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

// 根据指定第几页返回的数据

getProducts= async(pageNum)=>{
  // 显示loading
  this.setState({
    loading:true
  })
//  发送请求
   const res= await reqProduct(pageNum,PAGE_SIZE)
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
        <Button type="primary">提交</Button>
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
