import React, { Component } from 'react'
import { Card,Button,Table, Modal,Form, Input,message } from 'antd';

import memeryUtil from '../../../utils/memeryUtil'
import {reqAddRole,reqRoleList,reqUpdateRole} from  '../../../api'
import moment from '../../../utils/dateUtil'
import RoleTree from './RoleTree'
class Role extends Component {

  constructor(props) {
    super(props);
    this.tree = React.createRef();
  }
  state={
    dataSource:[],
    role:{}, //选中的role对象
    visible: false,
    total:0,
    isShow:false
  }



  // 给某个角色设置权限
  handleRow=(role)=>{
    return {
      onClick: event=>{
         this.setState({
          role
         })
      }
    };
  }

  // 弹框显示
  showModal=()=>{
    this.setState({
      visible: true,
    });
  }

  // 确认的回调
  handleOk=()=>{

  // 收集数据 
  this.props.form.validateFields(async (errors, values) => {
  // 表单验证
    if(!errors){
      const {roleName}=values
      // 重置输入
      this.props.form.resetFields()
      // 发送请求
      const result=await reqAddRole(roleName)
      if(result.status===0){
        message.success('添加成功')
        const role=result.data
        this.setState((state)=>({
          dataSource: [...state.dataSource,role]
        }))
      }else{
        message.error('更新失败')
      }

    }
     
  });
  
  // 更新状态
    this.setState({
      visible: false,
    });
  }
//  取消的回调
handleCancel=()=>{
  this.props.form.resetFields()
  this.setState({
    visible: false,
  });
}

handleRole=()=>{
  this.setState({
    isShow: false
  });
}

addRoleOk=async ()=>{
//  收集数据
  const role=this.state.role
  const menus=this.tree.current.getCheckedKeys()
  // 授权的权限
  role.menus=menus
  // 授权人(当前登入的用户)
  role.auth_name=memeryUtil.user.username
  // 授权时间
  role.auth_time=Date.now()

  // 发送请求
  const result = await reqUpdateRole(role)
  if(result.status===0){
    message.success('设置成功')
    // 重新显示状态
    this.setState({
      dataSource: [...this.state.dataSource]
    })

  }else{
    message.error('设置失败')
  }


  this.setState({
    isShow:false
  })
}


// 同步准备好数据
  initColumns=()=>{
  //  把数据保存到组件对象上
    this.columns=[
      {
        title: '角色名称',
        dataIndex: 'name',
        
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:(record)=>moment(record)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:(record)=>moment(record)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        
      },
    ]

  }
  getRoleList= async ()=>{
  // 发送请求
  const result=await reqRoleList()  //后面的代码都是异步的 相当于在promise成功的回调中执行的
  // 根据结果判断
  if(result.status===0){
    const dataSource=result.data
    // 更新状态
    this.setState({
      dataSource,
      total:dataSource.length
    })
    
  }
  }
// 同步准备数据
  componentWillMount(){
     this.initColumns()
  }



// 异步准备数据

componentDidMount(){
  
  this.getRoleList()

}

  render() {
    const {dataSource,role,total}=this.state
    const title=(
      <span>
        <Button type="primary" onClick={this.showModal}>创建角色</Button>
        <Button type="primary" 
        style={{marginLeft:'10px'}}
        disabled={!role._id}
        onClick={()=>{this.setState({isShow:true})}}
          >设置角色权限</Button>
      </span>
    )

    const {getFieldDecorator} =this.props.form
   
    return (
      <div>
       <Card  title={title} style={{ width: '100%' }}>
       <Table 
          dataSource={dataSource} 
          columns={this.columns} 
          rowKey='_id'
          bordered
          rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
          onRow={this.handleRow}
          pagination={{
            defaultCurrent:1,
            total:total,
            pageSize:3
          }}
          
          
          />;
      </Card>
      <Modal
          title="创建角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{span:4}} wrapperCol={{span:14}}>
            <Form.Item label="角色名称">
               {getFieldDecorator('roleName',{
                 rules:[
                  {
                    required: true,
                    message: '角色名称',
                  },
                 ]
               })(<Input placeholder="角色名称" />)}
              
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="权限名称"
          visible={this.state.isShow}
          onOk={this.addRoleOk}
          onCancel={this.handleRole}
        >
          <Form labelCol={{span:4}} wrapperCol={{span:14}}>
            <Form.Item label="权限名称">
               {getFieldDecorator('auth_name',{
                 rules:[
                  {
                    required: true,
                    message: '权限名称',
                  },
                 ],
                 initialValue:role.name
               })(<Input placeholder="权限名称" />)}
            </Form.Item>
          </Form>
          <RoleTree ref={this.tree} role={role}></RoleTree>
        </Modal>
      </div>
    )
  }
}

// 把form对像传递给Role组件  这是高阶组件
export default Form.create({})(Role)