
/*
  入口文件
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

import store from './utils/localStorage'
import memery from './utils/memeryUtil'

// 读取local中保存的user 保存到内存中
const user=store.readerUser()
memery.user=user

// 将App组件标签渲染到index页面的div上
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
