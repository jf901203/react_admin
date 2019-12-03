import React, { Component } from 'react'
import { Card,Button,Table, Modal,message } from 'antd';

import LinkButton from '../../../../components/link-button/LinkButton'
import {reqUsers,reqUserAdd,reqUserDel,reqUserUpdate} from '../../../../api'
import moment from '../../../../utils/dateUtil'
import AddForm from './AddForm';


export default class UserHome extends Component {
		// 设置组件的初始化状态 
		state={
			users:[],
			roles:[],
			isShow:false,
		}

  // react事件回调
		handleModal=()=>{
			// 当点击添加的时候 清空user
			this.role=null

			this.setState({
				isShow:true
			})
		}
		handleOk=()=>{
			const {validateFields,resetFields}=this.form
			const role=this.role || {}
			validateFields(async (errors, values) => {
			  if(!errors){
            let result
					 if(!role._id){
						result = await reqUserAdd(values)
					 }else{
						 values['_id']=role._id
						 result=await reqUserUpdate(values)
					}
					if(result.status===0){
						message.success(role._id ? '修改成功':'添加成功')
						resetFields()
						this.getUsers()
					}
					 
				}
			});

			this.setState({
				isShow:false
			})
		}
		handleCancel=()=>{
			const {resetFields}=this.form
			resetFields()
			this.setState({
				isShow:false
			})
		}
		handleDelete= (record)=>{
			Modal.confirm({
        title:`确认删除${record.username}`,
        onOk:async ()=>{
					const result = await reqUserDel(record._id)
						if(result.status===0){
							message.success('删除成功')
							this.getUsers()
						}
				}
			})
			
		}


		// 修改用户

		showUpdate=(record)=>{
		 
			this.role=record
      this.setState({
				isShow:true
			})

		}

		// 根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
		creatName=(roles)=>{
		this.roleName=roles.reduce((pre,role)=>{
        pre[role._id]=role.name
				return pre
			},{})

		}
	 
		// 异步获取用户列表
		getUsers=async ()=>{
		
			 const result=await reqUsers()
			 if(result.status===0){
				 const {users,roles}=result.data
        // 根据角色数组产生一个对象 
				 this.creatName(roles)
				 this.setState({
					users,
					roles
				 })
        
			 }

		}
		// 同步准备数据
		initColumns=()=>{
			// 把数据保存到当前组件对象上
			this.columns=[
        {
					title: '用户名',
					dataIndex: 'username',
				
				},
				{
					title: '邮箱',
					dataIndex: 'email',
					
				},
				{
					title: '电话',
					dataIndex: 'phone',
				
				},
				{
					title: '注册时间',
					dataIndex: 'create_time',
					render:(create_time)=>moment(create_time)
					
				},
				{
					title: '所属角色',
					dataIndex: 'role_id',
					render: role_id=>this.roleName[role_id] 
				},
				{
					title: '操作',
				  render: (record) => {
						return(
							<span>
								<LinkButton onClick={()=>{this.handleDelete(record)}}>删除</LinkButton>
								<LinkButton onClick={()=>{this.showUpdate(record)}}>编辑</LinkButton>
							</span>
						)
					},
				},
			]
		}

// 在渲染虚拟DOM之前把同步的数据准备好
componentWillMount(){
	this.initColumns()
}

	componentDidMount(){
		this.getUsers()
		
	}

    render() {
			const title=(
				<Button type="primary" onClick={this.handleModal}>创建用户</Button>
			)
				const {users,roles}=this.state
				const role=this.role
			  const titles=role ? '修改用户':'添加用户'
        return (
				<Card size="small" title={title}  style={{ width: '100%' }}>
					<Table 
					dataSource={users} 
					columns={this.columns} 
					bordered
					rowKey="_id"
					pagination={{
						pageSize:3,
						total:users.length
					}}
					/>
					<Modal
          title={titles}
          visible={this.state.isShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
					<AddForm 
					roles={roles}
					getForm={(form)=>this.form=form}
					role={role}
					></AddForm>
        </Modal>
				</Card>
        )
    }


	}