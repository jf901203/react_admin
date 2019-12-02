import React, { Component } from 'react'
import { Card,Button,Table } from 'antd';

import LinkButton from '../../../../components/link-button/LinkButton'
import {reqUsers} from '../../../../api'
export default class UserHome extends Component {

		// 设置组件的初始化状态 
		state={
			users:[],
			roles:[],
			isShow:false
		}

		// 根据数组生成一个对象

		creatName=(roles)=>{
		this.roleName=	roles.reduce((pre,role)=>{
        pre[role.role_id]=pre[role.name]
				return pre
			},{})

		}
	 
		// 异步获取用户列表
		getUsers=async ()=>{
		
			 const result=await reqUsers()
			 if(result.status===0){
				 const {users,roles}=result.data
				 console.log(users)
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
					
				},
				{
					title: '所属角色',
					dataIndex: 'role_id',
					render: (record)=>{
						console.log(record)
					}
				},
				{
					title: '操作',
					
				  render: () => {
						return(
							<span>
								<LinkButton>修改</LinkButton>
								<LinkButton>编辑</LinkButton>
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
				<Button type="primary">创建用户</Button>
			)
				const {users}=this.state
				
        return (
				<Card size="small" title={title}  style={{ width: '100%' }}>
					<Table 
					dataSource={users} 
					columns={this.columns} 
					bordered
					rowKey="_id"
					/>
				</Card>
        )
    }
}
