import React, { Component } from 'react'
import { Card,Button,Table } from 'antd';

import LinkButton from '../../../../components/link-button/LinkButton'
export default class UserHome extends Component {
    render() {
			const title=(
				<Button type="primary">创建用户</Button>
			)

			const dataSource = [
				{
					key: '1',
					name: '胡彦斌',
					age: 32,
					address: '西湖区湖底公园1号',
				},
				{
					key: '2',
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
			];
			
			const columns = [
				{
					title: '用户名',
					dataIndex: 'name',
					key: 'name',
				},
				{
					title: '邮箱',
					dataIndex: 'age',
					key: 'age',
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
			];
        return (
				<Card size="small" title={title}  style={{ width: '100%' }}>
					<Table 
					dataSource={dataSource} 
					columns={columns} 
					bordered
					
					/>
				</Card>
        )
    }
}
