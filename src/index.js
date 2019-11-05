
/*
  入口文件
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

// 将App组件标签渲染到index页面的div上
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
