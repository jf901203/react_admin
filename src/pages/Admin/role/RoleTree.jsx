
import React, { Component } from 'react'
import { Tree } from 'antd';

import menuList from '../../../menuConfig/menuList'
const { TreeNode } = Tree;

const treeData = menuList

export default class RoleTree extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  };

  onExpand = expandedKeys => {
   
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

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
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}

      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}

