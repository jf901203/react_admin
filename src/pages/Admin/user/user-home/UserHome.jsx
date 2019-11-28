import React, { Component } from 'react'
import { Card,Button,Table } from 'antd';

import LinkButton from '../../../../components/link-button/LinkButton'
export default class UserHome extends Component {

		// 设置组件的初始化状态 
		state={
      dataSource : [
				{
				
					name: '胡彦斌',
					age: 32,
					address: '西湖区湖底公园1号',
				},
				{
					
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				
			]
		}
	 
		// 同步准备数据

		initColumns=()=>{
			// 把数据保存到当前组件对象上
			this.columns=[
        {
					title: '用户名',
					dataIndex: 'name',
				
				},
				{
					title: '邮箱',
					dataIndex: 'age',
					
				},
				{
					title: '电话',
					dataIndex: 'address',
				
				},
				{
					title: '注册时间',
					dataIndex: 'address',
					
				},
				{
					title: '所属角色',
					dataIndex: 'address',
					
				},
				{
					title: '操作',
					dataIndex: 'address',
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

    render() {
			const title=(
				<Button type="primary">创建用户</Button>
			)
				const {dataSource}=this.state
				
        return (
				<Card size="small" title={title}  style={{ width: '100%' }}>
					<Table 
					dataSource={dataSource} 
					columns={this.columns} 
					bordered
					rowKey="_id"
					/>
				</Card>
        )
    }
}
