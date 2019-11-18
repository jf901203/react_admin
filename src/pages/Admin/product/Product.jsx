import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductHome from './product-home/ProductHome'
import ProductDetail from './product-detail/ProductDetail'
import ProductAdd from './product-add/ProductAdd'
import './product.less'
export default class Product extends Component {
  render() {
    return (
      <div className="product">
        <Switch>
          <Route path="/product" component={ProductHome} exact/>
          <Route path="/product/productadd" component={ProductAdd} />
          <Route path="/product/detail" component={ProductDetail} />
          <Redirect to="/product" />
        </Switch>
      </div>
    )
  }
}
