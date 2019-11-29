
import React, { Component } from 'react'
import { Tree } from 'antd';
import PropTypes from 'prop-types'
import menuList from '../../../menuConfig/menuList'
const { TreeNode } = Tree;
const treeData = menuList

export default class RoleTree extends React.Component {
  static propTypes={
    role:PropTypes.object
  }
 
  constructor(props){
    super(props)
    const menus=this.props.role.menus
    this.state={
      expandedKeys: ['0-0-0', '0-0-1'],
      checkedKeys:menus,
      selectedKeys: [],
    }
  }
 


  onCheck = checkedKeys => {

    this.setState({ checkedKeys });
  };
  
  getCheckedKeys=()=>{
    return this.state.checkedKeys
  }
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.reduce((pre,item)=>{
      pre.push((
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.renderTreeNodes(item.children):null}
        </TreeNode>
      ))
      return pre
    },[])

//初始化数据不会调用钩子  当数据发生改变的时候才会调用   prop 更改时重新计算某些数据
// 最新的数据会被保存到extProps对象中
componentWillReceiveProps(extProps){
  
  this.setState({
    checkedKeys:extProps.role.menus
  })

}

componentWillMount(){
 this.treeNode= this.renderTreeNodes(treeData)
}
  render() {
    return (
      <Tree
        checkable
        defaultExpandAll={true}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
      <TreeNode title="平台权限" key="all">
           {this.treeNode}
      </TreeNode>
        

      </Tree>
    );
  }
}

