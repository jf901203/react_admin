

## react框架做后台应用

1. creat-react-app admin_client 工程化项目
2. npm start 启动项目 编码，自动编译打包刷新(live-reload) 查看效果
3. npm run build 生产环境打包 生成本地文件(最终放到服务器上的文件)
4. npm install -g serve 在本地打开打包后的本地文件
5. serve build 打开本地打包的文件



## git 

1. git init 初始化本地仓库
2. git add . 添加到暂存区
3. git commit -m"" 提交到本地仓库
4. git romote add origin https://github.com/jf901203/react_admin.git 关联远程仓库
5. git push origin master 把本地仓库的资源推送到远程分支


## 新建分支

1. git checkout -b dev (分支名) 在本地新建分支并切换分支 分支的代码与主支的一致
2. git push origin dev 将本地分支推送到远程分支


## 从远程克隆分支到本地

1. git clone https://github.com/jf901203/react_admin.git 克隆远程仓库地址
2. cd react_admin 进入仓库
3. git checkout -b dev origin/dev 根据远程dev分支生成本地dev分支
4. git branch 查看分支
5. git pull origin dev 从远程分支dev拉取到本地dev


## 推送本地 dev 分支到远程 dev 分支

1. git add -A  提交所有新增的文件和修改过后的文件
2. git commit -m"" 提交到本地仓库
3. git push origin dev 推送本地 dev 分支到远程 dev 分支


## React每一个组件都必须引入 import React, { Component } from 'react' 不管用不用

1. render()函数 必须返回一个虚拟DOM对象
2. 用jsx语法创建虚拟DOM对象
3. 最终生成一个真实DOM对象

## 渲染成真正的DOM对象

1. 需要引入一个库 import ReactDOM from 'react-dom'

## 引入模块 自定义模块有相对路劲的关系

1. 第三方模块  import ReactDOM from 'react-dom'  不需要具体路径
2. 自定义模块  import App from './App.jsx' 需要具体路径
3. 自定义模块会有相对路径的关系
4. 第三模块没有相对路劲的关系


## 渲染组件

	// 将App组件标签渲染到index页面的div上
	ReactDOM.render(<App />, document.getElementById('root'));

## 解决移动端点击事件300ms延迟

	  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />

	  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
	  <script>
	    if ('addEventListener' in document) {
	      document.addEventListener('DOMContentLoaded', function() {
	        FastClick.attach(document.body);
	      }, false);
	    }
	    if(!window.Promise) {
	      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
	    }
	  </script>

## src 目录结构

1. api        ===>ajax相关的文件
2. assets     ===>共用资源
3. components ===>非路由组件
4. config     ===>配置
5. pages      ===>路由组件
6. utils      ===>工具模块 (日期格式化 数据缓存)
7. App.jsx    ===>应用根组件
8. index.js   ===>入口js

## ui组件库 写标签传属性

## 使用react组件库  antd组件库 默认是全部打包 

1. https://ant.design/components/button-cn/
2. https://mobile.ant.design/components/button-cn/

1. npm install antd --save

## 实现按需加载的依赖库 根据 import引入进来的组件进行打包

1. npm install --save react-app-rewired 
2. npm install --save babel-plugin-import
3. npm install --save customize-cra

## 在根目录下(不是在src目录)定义加载配置的js模块 config-overrides.js

	const { override, fixBabelImports } = require('customize-cra');
	
	module.exports = override(
	    fixBabelImports('import', {
	        libraryName: 'antd',
	        libraryDirectory: 'es',
	        style: 'css',
	    }),
	    );

## 引入组件库中的某一个组件

1. import { Button } from 'antd-mobile'

# 自定义antd主题 antd就是用less写的 就是改变样式的颜色

1. npm install --save less less-loader

	const { override, fixBabelImports,addLessLoader } = require('customize-cra');

    // 实现按需打包 antd组件：根据import进来的组件进行打包

    module.exports = override(

	    fixBabelImports('import', {
	        libraryName: 'antd',
	        libraryDirectory: 'es',
	        style: true, //自动打包相关组件对应的样式
	    }),
        // 使用less-loader对源码中的less的变量进行重新覆盖
	    addLessLoader({
	          javascriptEnabled: true,
	          modifyVars: { '@primary-color': '#1DA57A' },
	         })

    );


## 引入理由react-router-dom

1. 下载路由包：npm install --save react-router-dom

## 路由器标签

1. BroserRouter
2. HashRouter

## 路由切标签

1. Link
2. NavLink
3. Redirect

## 路由组件显示标签

1. Route

## 多个路由组件只匹配显示标签

1. Switch===>Route


## 一级路由需要在路由外层加路由器

    render() {
	    return (
	      <BrowserRouter>
	        <Switch>
	          <Route path="/login" component={Login}></Route>
	          <Route path="/" component={Admin}></Route>
	        </Switch>
	      </BrowserRouter>
	    )


## 引入样式重置文件 reset.css

## react中用的less编译器

1. less结构化编写


## 按钮

1. 一般按钮 不会有提交的功能
2. 提交按钮 type="submit" 会触发onSubmit事件


## 前台表单验证


## 后台表单验证


## 收集表单数据进行发请求

