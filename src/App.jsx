/*
  应用的根组件
  
*/ 
import React, { Component } from 'react'

import { Button } from 'antd'

export default class App extends Component {

  render() {
    return (
      <div>
        <h1>Hello 2</h1>
        <Button type="primary">Button</Button>
      </div>
    )
  }
}
