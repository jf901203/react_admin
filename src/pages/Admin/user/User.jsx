import React, { Component } from 'react'

import {Switch,Route,Redirect} from 'react-router-dom'

import UserHome from './user-home/UserHome'

import UserUpdate from './user-update/UserUpdate'

export default class User extends Component {
  render() {
    return (
      <div>
       <Switch>
         <Route path='/user' component={UserHome} exact></Route>
     
         <Route path='/user/update' component={UserUpdate}></Route>
         <Redirect to="/user" />
       </Switch>
      </div>
    )
  }
}
