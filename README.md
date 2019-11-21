

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

1. 第三方模块  import ReactDOM from 'react-dom'  不需要具体路径 会自动去node_modules依赖中找
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

## 在根目录下(不是在src目录)定义加载配置的js模块 config-overrides.js 根据import引进来的组件自动引进相对应的组件样式

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
2. 实现按需打包
3. 打包的时候就只打包Button组件

# 自定义antd主题 antd就是用less写的 就是改变样式的颜色

1. npm install --save less less-loader  安装了less就可以用less来编写css样式了
 
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


## 引入路由react-router-dom

1. 下载路由包：npm install --save react-router-dom

## 路由器标签

1. BroserRouter
2. HashRouter

## 路由导航标签

1. Link
2. NavLink
3. Redirect 有自动跳转的功能 to="/login" 自动跳转到/login路由

## 路由组件显示标签

1. Route

## 多个路由组件只匹配显示标签

1. 
2. 
3. ===>Route


## Switch

1. 会监听到所有的路由路劲与Route中的path进行匹配 匹配成功就显示
2. 匹配不成功 就会执行 Redirect to=""


          <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/pillar" component={Pillar}></Route>
              <Route path="/line" component={Line}></Route>
              <Route path="/pie" component={Pie}></Route>
              <Redirect to="/home"/>
            </Switch>

## 在事件回调中做跳转

1. this.props.history.replace()
2. this.props.history.push()

## 在render()函数中做跳转

     return <Redirect to=""></Redirect>


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
2. 提交按钮 type="submit" 会触发onSubmit事件 阻止事件的默认行为 e.preventDefalut()

## 高阶函数

1. 一类特别的函数
   - 接收函数作为参数的函数
   - 返回值是函数
2. 满足以上任何一个条件就是高阶函数
3. 常见的高价函数 setTimeout()
4. setInterval()
5. Promise()
6. then()
7. reduce()
8. filter()
9. find()
10. some()
11. forEach()
12. map()
13. findIndex()
14. fn.bind()返回一个函数 fn.bind()() 函数对象的bind()方法
15. Form.create()(Login) 
16. getFieldDecorator()()
17. catch()

## 高阶组件(函数) 父组件向子组件传递属性 

1. 本质是一个函数
2. 接收一个组件(被包装组件)返回一个新组件(包装组件)
3. 包装组件向被包装组件传入特定的属性
4. 渲染的是包装组件 即新组件
5. Form.create()返回的函数是高阶组件 这个组件接收一个组件做为函数的参数 产生一个新的组件
6. 高阶组件接收一个组件返回一个新的组件
7. 渲染的是新的组件(包装组件) 新的组件包装了被包装的组件
8. 新组件是父组件 被包装的组件是子组件 父组件向子组件传递属性
9. 高阶组件也是高级函数 接收的是组件函数 返回的是新的组件函数

1. const  WrapLogin = Form.create()(Login); 接收一个组件做为函数的参数  Login是组件    <Login/>是组件标签 即组件对象
2. 返回一个包装有form表单的组件并向组件传递了this.props.form对象


## 创建组件的两种语法

1. 工厂函数 返回一个对象      function Login(props){return (div) }
2. 类定义  类的本质是一个函数


## 组件与组件标签

1. 组件是一个构造函数 是一个类      类型 Login
2. 组件标签是某一个类的实例 组件对象 实例 <Login/>


## getFieldDecorator('标识名称',{})(表单控件)

## 数组中的数据以下标做为标识

## 对象中的数据以名称作为标识


## 配置对象(属性名是一些特定的名称) 声明式配置对象

1. 什么是配置对象
2. 属性名是一些特定的名称 就是配置对象
3. options包含选项的对象
4. 每一个特定的属性就是一个option

## 前台表单验证

1. 验证通过
2. 发送请求请求实现登入功能

## 维持登入与自动登入 必须将用户信息保存在刷新之后 关掉浏览器之后依然存在的位置

1. 维持登入 刷新不掉线 
2. 关掉应用后开启应用实现免登入功能
3. localStorage 持久化登入


## 维持登入与自动登入

1. 登入后 刷新依然是已登入状态(维持登入)
2. 登入后 关闭浏览器后打开浏览器访问依然是已登入状态(自动登入)


3. 登入后 访问登入路径自动跳转到管理界面


## localStorage

1. 持久化存储
2. 关掉浏览器 关掉应用不会影响到数据的丢失


## cookie也可以做持久化和免登入


## JSON.parse() 方法将数据转换为 JavaScript 对象

1. text:必需，一个有效JSON格式的字符串。

## JSON对象

1. SON 对象在大括号（{}）中书写：
2. { "name":"菜鸟教程" , "url":"www.runoob.com" }

## JSON 数据的书写格式是：名称/值对

1. 名称/值对包括字段名称（在双引号中），后面写一个冒号，然后是值


## JSON.parse()

1. 在接收服务器数据时一般是字符串 '{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }' ===>一个json字符串对象
2. JSON.parse() 方法处理以上数据，将其转换为 JavaScript 对象
3. var obj = JSON.parse('{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }') ===>将json字符串对象转换成js对象
4. { "name":"runoob", "alexa":10000, "site":"www.runoob.com" } ===>js对象


## JSON.stringify(value)

1. 在向服务器发送数据时一般是字符串
2. JSON.stringify() 方法将 JavaScript 对象转换为字符串 
3. value 要转换的 JavaScript 值（通常为对象或数组）
4. var obj = { "name":"runoob", "alexa":10000, "site":"www.runoob.com"} ===>js对象 向服务器发送数据
5. JSON.stringify(obj) 将这个js对象转换成json的字符串发送给服务器
6. '{ "name":"runoob", "alexa":10000, "site":"www.runoob.com"}'===>装换成json的字符串


## 封装locaStorage

	/*
	  但是刷新之后就掉线了
	  怎么维持不掉线呢
	
	*/
	const USER_KEY="user_key"
	export default {
	//  保存user对象 存一个json字符串
	 saveUser(user){
	       localStorage.setItem(USER_KEY,JSON.stringify(user));
	 },
	//  读取user对象 读一个js对象
	 readerUser(){
	   return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
	 },
	
	//  删除user
	
	removeUser(){
	  localStorage.removeItem(USER_KEY);
	}
	
	}

## store跨浏览器本地存储的简单API

1. npm install --save store
2. import store from 'store'

	const USER_KEY="user_key"

	export default {
		
		 saveUser(user){
		    store.set(USER_KEY)
		 },
		
		 readerUser(){
		   return store.get(USER_KEY) || {}
		 },
		
		//  删除user
		
		removeUser(){
		  store.remove(USER_KEY')
		}
		
		}

## 从内存中读取user 不是从localStorage中读 在入口文件就开始读取存储的用户信息
	
	import store from './utils/localStorage'
	import memery from './utils/memeryUtil'
	
	// 读取local中保存的user 保存到内存中
	
	const user=store.readerUser()
	memery.user=user
1. 以后直接从内存中读取user 就不用从localStorage中读取user信息了

## 发送请求得到用户信息

1. 在前台把用户信息保存起来实行用户的自动登入功能

## 发送请求的两种方式

1. get请求会把参数和地址一起发送  params
2. post请求会把请求参数放到请求体中 body
3. from-data 表示带文件的表单提交
4. x-www-form-urincoded 提交纯文本类型的form表单
5. raw 文件
6. binary 文件

## 后台表单验证


## 收集表单数据进行发请求



## 利用axios封装ajax请求模块

1.  npm install --save axios

		/*
		 能发异步ajax请求的函数模块
		 封装axios库
		 函数的返回值是promise对象
		 用axios发异步的ajax请求
		 axios.get() 返回的是一个promise对象  所以可以promise=axios.get()  promise.then(()=>{})
		 axios.get().then()
		*/
		
		import axios from 'axios'

		export default function ajax(url,data={},type="GET"){
		 return new Promise((resolve,reject)=>{
		    let promise
		    if(type==="GET"){
		      // let base=''
		      // Object.keys(data).forEach((item)=>{
		      //   base+=item+'='+data[item]+'&'
		      // })
		      // if(base!==''){
		      //   base=base.substr(0,base.lastIndexOf('&'))
		      //   url+='?'+base
		      // }
		      promise=axios.get(url,{ //配置对象  params指定的query的参数 配置对象的属性名是一些固定的属性名

		        params:data //指定请求的参数

		      }
		      )
		    }else{
		      promise=axios.post(url,data)
		    }
		    promise.then((res)=>{
		      resolve(res.data)
		    }).catch((error)=>{
		      reject(error)
		    })
		  })
		}



## 后端node用commonJs模块

1. const axios = require('axios')


## 前端用ES6模块

1. import axios from 'axios'
2. axios.get(url,{params:{}}).then().catch()  axios.get()返回的是promise对象
3. axios.post().then().catch()   xios.post()返回的是promise对象
4. new Promise(()=>{}).then().catch()  new Promise 返回promise对象

## 在开发环境中前后台分离的项目都会涉及到跨域的问题

1. 协议不同
2. 主域名不同
3. 端口不同

## 解决ajax跨域的请求问题(开发时)

1. 办法：配置代理===>只能代理开发环境
2. 编码:package.json===> proxy:'http://localhost:5000'
3. 代理监听前端端口 3000
4. 代理负责转发地址 5000
5. 转发的目标就是服务器应用的地址


## 对代理的理解

1. 代理是什么？===>具有特定功能的程序
2. 运行在哪？

    - 前台应用端
    - 只能在开发时使用
    
3. 作用？===>解决开发时的ajax请求跨域问题

   - 监视并拦截请求3000
   - 转发到5000
   
4. 配置代理

   - 告诉代理服务器一些信息：比如转发的目标地址
   - 开发环境：前端工程师
   - 生产环境：后端工程师



## 项目是前后台分离的项目 前端请求后端的主域名

1. 前台应用与后台应用
2. 后台应用负责处理前台应用提交的请求 并给前台应用返回json数据
3. 前台应用负责展现数据 与用户交互 与后台应用交互
4. 前端的应用在3000的端口展示数据 后台的数据在5000的端口上面
5. 会涉及到的问题 3000的端口去请求5000的端口 端口号不一致造成了跨域

## 数据在5000端口

1. 5000端口处理前端3000端口发送过来的请求
2. 返回json数据
3. 5000端口下面才有对应的处理路由的程序

## 前台在3000端口展现数据

1. 前端3000端口展现的数据在5000端口上
2. 向5000端口发送请求 获取数据


## 开发环境服务器模块包含了代理服务器依赖

1. webpack-dev-server webpack开发服务器
2. http-proxy-middleware 
3. express 前台服务器
4. 启动代理服务器转发请求 "proxy": "http://localhost:5000"


## 前端应用有前端的服务器

1. webpack-dev-server webpack
2. 运行在前端服务器

## 后端应用有后端应用的服务器

1. express
2. 运行在后台服务器


## 解决跨域请求

1. jsonp只能解决get的方式发送的请求 不能解决post的发送的请求
2. cors 后台允许跨域
3. 代理  代理监视的是前端的端口 转发的目的是后端的端口

## 配置代理解决ajax请求跨域问题 在react中配置代理

1. "proxy": "http://localhost:5000"
2. 5000端口下才有对应的后端路由处理
3. /login


## 在浏览器查看请求的ajax (XHR)===>XMLHttpRequest()

1. 请求的路劲   Header Request URL: http://localhost:3000/login
2. 请求的方式   Header Request Method: POST
3. 请求的参数   Header Request payload
4. 响应的数据   Response

## 安装mongodb

1. 启动mongodb mongod.exe --dbpath C:\Program Files\MongoDB\Server\4.0\data
2. It looks like you are trying to access MongoDB over HTTP on the native driver port.
3. MongoDB已经开启
4. 先安装好MongoDB，并且切换到MongoDB的bin目录下
5. net start MongoDB 命令 启动MongoDB


## 启动MongoDB的方式

1. 先安装好MongoDB，并且切换到MongoDB的bin目录下
2. net start MongoDB命令 启动MongoDB


## C:\Users\Administrator>net start MongoDB 发生系统错误 5。  拒绝访问。

1. 按Windows+X+A，直接打开命令提示过（管理员），再次输入确认问题
2. net start MongoDB

## 测试接口

1. 在访问请求代码前
2. 用Postman 邮递员软件测试接口
3. postman是用来测试API的工具
4. postman可以看做活的接口文档


## API分为接口API和文档API

1. 文档API单纯是指语法 用法 语法糖 这个方法怎么用
2. 接口API：请求的地址 请求的参数 请求的方式 响应的数据


## 暴露模块的方式

1. 分别暴露 export function ajax(){}    import {ajax} from 
2. 统一暴露 export defalut{ ajax(){} }  import xxx from 


## 分别暴露

	import ajax from './ajax'
	export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST')

## 统一暴露

	import ajax from './ajax'

	export default{

	  reqLogin(username,password){return ajax('/login',{username,password},'POST')},

	  reqOut(){}
	
	}


## 函数的参数 参数默认值是对象 实参传值的时候也是对象

1. function login(data={}){}
2. login({name,pwd})


## async和await 直接得到的是promise的结果数据 没有then().catch()的回调了

1. 作用
2. 
   - 简化了promise对象的使用
   - 不再使用then()来指定成功/失败的回调函数
   - 以同步的编码方式(没有回调函数了)实现异步的流程 没有写回调函数
   - await reqLogin(username,password)  没有then()回调代码

2. 哪里写await 返回promise表达式的左侧  await===promise.then()

  - 先确定await 再确定async
  - 在返回promise表达式的左侧写await 不想要promise 想要promise异步执行的成功的value数据
  - await必须写在async函数中
  - await reqLogin() 等待 等到函数返回一个成功的数据

3. 哪里写async 函数定义的左侧

  - 写在await所在函数的左侧
  - await在哪个函数async就在哪个函数的左侧
  - await所在函数(最近的)定义的左侧写async



## 回调函数的分类 区别在于放到回调队列等待执行和不放到回调队列 立即执行 Promise(同步执行的回调函数).then(异步执行的回调函数).catch(异步执行的回调函数)

1. 同步回调
2. 异步回调


## 同步回调

1. 理解：立即执行 完全执行完了才结束 不会放入到回调队列中
2. 例子：数组相关的回调函数/Promise(()=>{})的excutor执行器函数
3. Promise(同步执行的回调函数).then(异步执行的回调函数).catch(异步执行的回调函数)
4. arr.find(执行器函数) 找到数组中满足条件的一项 只能遍历一层 [{},{},{}]  [{},{children:[{},{}]}] 不合适
5. arr.map(执行器函数)
6. arr.filter(执行器函数)
7. arr.findIndex(执行器函数) 找到数组中满足条件的下标

## 异步回调

1. 理解：不会立即执行 会放入到回调队列中等待将来执行
2. 例子：定时器回调/ajax回调/Promise的成功回调then()/失败的回调catch()/DOM事件响应回调


## 宏任务回调

1. 定时器回调/ajax回调/DOM事件响应回调


## 微任务回调

1. Promise的成功回调then()/失败的回调catch()

## JS执行时会区别这2个队列

	1. JS引擎首先必须先执行所有的初始化同步任务代码
	2. 每次准备取出第一个宏任务执行前, 都要将所有的微任务一个一个取出来执行

## Promise封装axios

	new Promise(()=>{
	 
	 1. 执行异步ajax请求
	
	 2. 如果请求成功了 调用resolve(val)
	 
	 3. 如果请求失败了 不调用reject() 而是提示异常信息
	
	
	})


## 封装axios 

	import axios from 'axios'
	export defalut function  ajax(url,data={},type="GET") {
	
		if(type==="GET"){
            //返回的是promise对象  外面调用ajax().then((response)=>{}) 就可以拿到数据
	      return axios.get(url,{params:data})
		}else{
            //返回的是promise对象
			return axios.post(url,data)
		}
		
	}
   
	   const reqLogin=(name,pwd)=>ajax('/login',{name,pws}) ===>得到一个promise对象
	   
	   async getLogin(){
	     //处理异常
	    try{
	      const res=await reqLogin(name,pwd)
	    }catch(error){
	      console.log(error.message)
	    }
	
	   }


## 编程式导航 在事件回调函数中调用

1. this.props.history.replace('/')
2. this.props.history.push()


## 作用域  在作用域中的数据别的作用域都看不见 需要数据传递

1. 全局作用域
2. 函数作用域
3. 组件作用域



## 路由

1. 一级路由
2. 二级路由


## 路由组件拥有的三大属性 可以通过浏览器工具react-devtools可以查看 前提是路由组件

1. this.props.history.replace()/push()
2. this.props.location.pathname 获取到路由路劲
3. this.props.match

##　一般组件想拥有路由组件的三个属性必须用到路由的withRouter()高阶组件函数

1. withRouter()包装一个非路由组件 反回一个新的组件
2. withRouter()高阶组件
3. 新的组件向非路由组件传递3个属性:history/loaction/match

## 组件的任何属性都是从props中获取 可以通过react-devTools浏览器工具查看


##　模块类型

1. 模块类型设置为对象 对象中添加属性就可以存储数据了　

	　　　	export default {
				  user:{}
			}

2.　模块类型设置为数组　根据数据数组产生标签数组

		const menuList=[
		    {
		        key:"/home",
		        type:'home',
		        title:'首页'
		    },
		    {
		        key:"/products",
		        type:'user',
		        title:'商品',
		        children:[
		            {
		                key:"/category",
		                type:'apartment',
		                title:'品类管理'
		            },
		            {
		                key:"/product",
		                type:'branches',
		                title:'商品管理'
		            }
		        ]
		    },
		    {
		        key:"/user",
		        type:'user',
		        title:'用户管理'
		    },
		    {
		        key:"/role",
		        type:'slack',
		        title:'角色管理'
		    },
		    {
		        key:"/gragh",
		        type:'area-chart',
		        title:'图形图表',
		        children:[
		            {
		                key:'/pillar',
		                type:'bar-chart',
		                title:'柱形图'
		            },
		            {
		                key:'/line',
		                type:'line-chart',
		                title:'折线图'
		            },
		            {
		                key:'/pie',
		                type:'pie-chart',
		                title:'饼图'
		            }
		        ]
		    }
		    
		]
		
		export default  menuList

## map() 加 递归调用

			getMenuNode=(menuList)=>{
			    return menuList.map((item)=>{
			      if(!item.children){
			        return(
			          <Menu.Item key={item.key}>
			               <Link to={item.key}>
			                <Icon type={item.type} />
			                  {item.title}
			              </Link>
			            </Menu.Item>
			        )
			      }else{
			        return (
			          <SubMenu
			          key={item.key}
			          title={
			            <span>
			              <Icon type={item.type} />
			              <span>{item.title}</span>
			            </span>
			          }
			        >
			         
			         {
			          //  item.children.map((child)=>{
			          //   return(
			          //     <Menu.Item key={child.key}>
			          //     <Link to={child.key}>
			          //      <Icon type={child.type} />
			          //        {child.title}
			          //    </Link>
			          //  </Menu.Item>
			          //   )
			
			          //  })
			          // 递归调用
			          this.getMenuNode(item.children)
			        
			        }
			          
			      </SubMenu>
			        )
			      }
			
			    })
			  
			  }


## reduce()加递归调用  reduce((pre,item)=>{},[]) 累计累加  往数组中添加数据也是一种累加

1. []初始值
2. pre 上一次统计的结果
3. 一直用同一个pre 一直往pre中添加


		getMenuNode=(menuList)=>{

		    return menuList.reduce((pre,item)=>{
		      if(!item.children){
		        pre.push(
		           (
		             <Menu.Item key={item.key}>
		               <Link to={item.key}>
		                <Icon type={item.type} />
		                  {item.title}
		              </Link>
		            </Menu.Item>
		            )
		           )
		      }else{
		       
		         pre.push((
		          <SubMenu
		          key={item.key}
		          title={
		            <span>
		              <Icon type={item.type} />
		              <span>{item.title}</span>
		            </span>
		          }
		        >
		         
		         {
		          
		          this.getMenuNode(item.children)
		        
		        }
		          
		      </SubMenu>
		           ))
		       
		      }
		    //返回统计的结果 作为下一次统计的条件
		    return pre; 
		
		    },[])
		  
		  }

## bug

1. 功能性bug===>功能有问题


2. 异常性bug

## 使用react-router-dom

1. withRouter() 包装非路由组件 给组件传入history/location/match属性
2. history:replace()/push()/goBack()
3. match:param属性
4. location:pathname属性


## componentWillMount()与componentDidMount()

1. componentWillMount()：在第一次render()之前调用一次 为第一次render()准备数据(同步的数据)
2. componentDidMount()：在第一次render()之后调用一次 启动(发ajax请求/启动定时器的异步操作)异步任务 后面异步更新状态
3. render():只要更新就会重新渲染


## componentDidMount() 只执行一次

1. render() 函数第一次执行之后
2. 一般在这个钩子中执行异步操作 
3. 发ajax请求
4. 启动定时器
5. componentDidMount() 异步发送ajax 获取到数据 更新state状态 触发render()函数的重新渲染
6. 在发送ajax异步函数之前 组件中必须有自身的渲染状态 发送请求 返回数据 才能更新这个状态


## render() 渲染函数 需要渲染的数据必须在这个钩子中取出来 才能将数据展现到页面上

1. 把取出来的数据用js代码的的形式写入到虚拟DOM中
2. render()函数监视的是数据的变化
3. 如果数据变化了就立即从新渲染


## jsonp请求的接口函数  发送请求获取在线的天气预报

1. npm install jsonp --save


## ajax请求受同源策略限制不能进行跨域请求

1. 但是script标签中的src属性却不受限制，jsonp就是利用这一特性来实现跨域请求。

## jsonp解决ajax跨域的原理

1. jsonp只能解决get类型的ajax请求跨域问题
2. jsonp请求不是ajax请求 而是一般的get请求

## 基本原理

1. 浏览器端

    - 动态生成script来请求后台接口(src就是接口的url)
    - 定义好用于接收响应数据的函数，并将函数名通过请求参数提交给后台(callback=fn)
2. 服务器端：

    - 接收到请求处理产生结果数据后，返回一个函数调用的js代码 并将结果数据作为实参传入函数调用

3. 浏览器端：

    - 收到响应自动执行函数调用js代码 也就执行了以前定义好的回调函数，并得到了需要的结果数据


## Date.now() 当前时间戳 转换成标准格式

1. 转换成一个标准的时间格式
2. npm install date-fns --save   
3. npm install moment --save


	import format from'date-fns/format'
	export default function moment(date,formatStr='yyyy-MM-dd HH:mm:ss'){
	
	  return format(date, formatStr)
	
	}


##　函数组件 标签的属性都会传入到props对象中

1. {...props} 解构传进来的对象

	import React, { Component } from 'react'
	
	import './linkButton.less'

	export default function LinkButton (props){
	
	  return <button {...props} className="linkButton"></button>
	}


# category 类别管理路由

## 静态界面

## 接口请求函数

## 动态显示一级分类列表




## render()渲染函数中必须准备数据

1. 数据来源组件传递
2. 发送ajax请求获取 ===>更新的state
3. 自己定义组件的state === >组件自己的状态


## state 数据保存到数据中

1. 当数据发生变化render()就会重新渲染
 
2. 初始化状态   ===>state={}  ===>初始化
3. 更新状态     ===>this.setState({})  ===>改变状态的行为函数中
4. 读取状态     ===>{}=>this.state ===>渲染函数中


## 数据在组件状态中 只要状态发生改变  组件会重新渲染

1. 设计状态 state={}
2. 发送请求 ===>得到数据
3. 更新状态 this.setState({},()=>{})
4. 读取状态数据 ===>显示到界面


## this.setState({},()=>{})

1. 是一个异步更新的方法

## render()中需要渲染的数据

1. 都应该把数据定义成变量 提高扩展性
2. render()函数中的数据 每次重新渲染都会产生一次


## 根据接口文档写出接口函数

1. 先测试接口
2. 再写接口请求函数
3. 函数有形参默认值
4. 实参有两种传法 普通传法 对象传法   


## 在异步发送请求时 数据没有回来

2. 初始化状态          loading :false
3. 请求前 显示loading  loading:true
4. 请求后 隐藏loading  loading:false


## 在react中向事件回调函数中传递参数

1. 一般事件函数  onClick={this.subHandle}  渲染的时候就开始调用了
2. 事件回调函数 onClick={()=>{this.sunHandle(food)}} 当点击的时候才开始调用

## 如何向事件回调函数中传递参数：先定义一个匿名函数 在函数中调用处理函数 并传入数据

1. 事件回调函数 onClick={()=>{this.sunHandle(food)}}
2. 实现向事件回调函数中传参数

## this.setState({},callback)  callback状态更新之后立即执行

1. setState()是一个异步的方法 当所有同步的代码都执行完毕之后才会执行异步的代码
2. 回调函数会在状态更新且重新render()之后执行
3. 相当于vue的$nextTick()

## setState()不能立即获取最新的状态 因为setState()是异步更新状态的

1. 等所有的同步代码执行完毕之后才会执行setState()方法中的代码


## 印记中文

1. https://docschina.org


## 三步表达式

1.  id==="0" ? '' :null   null===>表示不作任何操作


## 表单提交必须要有 form表单 用了antd中的form表单组件 

1. 收集数据
2. 表单收集的数据都保存在form对象上
3. 清除输入数据 
4. 表单验证


## 使用PropTypes进行类型检查

1. import PropTypes from 'prop-types'

2. 声明接收的属性

	static propTypes ={
	  categoryName:PropTypes.string.isRequired
	 }

3. 读取接收的属性

    const categoryName=this.props.categoryName


## 数据可以保存在组件对象上 也可以保存在状态中

1. this.categoryName=categoryName
2. state={categoryName:categoryName}


## 更新类

1. 显示旧的类名
2. 发送请求修改类名
3. 重新显示列表


## 父作用域与子作用域

1. 父作用域看不见子作用域的数据
2. 子作用域可以看见父作用域的数据

## 父组件与子组件

1. 父组件看不见子组件的数据
2. 子组件也看不见父组件的数据
3. 子组件需要父组件的数据 需要传递  父传子  props
4. 父组件需要子组件的数据 需要传递  子传父  第三方库pubsub
5. 如果父组件中已经有数据了 直接传递给子组件 子组件就不需要再发送一次请求了

## 子组件传递数据给父组件

1. pubsub-js 发布与订阅
2. PubSub.publish('handle', data); ===>发布  发布消息之后全局组件都可以看得到
3. PubSub.subscribe('handle', (msg,data)=>{})===>订阅

## 下载与引入发布订阅 组件是兄弟组件或者隔代组件 是组件都合适

1. npm install --save pubsub-js
2. import PubSub from 'pubsub-js'


## 不借用第三方库 子组件也可以向父组件传递数据 通过props

1. 通过props传递函数属性 
2. 子组件就可以调用父组件的函数 传递参数
3. 参数就是子组件向父组件传递的数据


## props传递属性

1. 函数属性
2. 非函数属性(一般属性) 父组件传递给子组件

## props传递的属性类型决定了父组件传递数据给子组件还是子组件将数据传递给父组件

1. props传递的是一般属性 数据传递的方向就是 父组件传递给子组件
2. props传递的是函数属性 数据传递的方向就是 子组件传递给父组件

## props传递的函数属性

1. getForm={from=this.form=form}  ===>把form参数赋值给当前组件的form对象上
2. getForm={(form)=>{return this.form=form}}
3. getForm={(form)=>this.getForm(form)}  ===>在组件中准备this.getForm(form)这个函数


## 组件之间的通传入值的时候需要声明接收

1. import PropTypes from 'prop-types'
2. 指定数据类型

		static propTypes ={
		  categoryName:PropTypes.string.isRequired,
		  setForm:PropTypes.func.isRequired
		 }

3. 读取属性

4. this.props.categoryName
5. this.props.setForm(this.props.form) 调用函数属性

## 读取更新后的数据

1. 在render函数中读取
2. 在setState({},callback) 在callback函数中读取
3. setState()执行后不会立即改变状态


## 后台管理系统

1. 用Table是非常常用的
2. 就是数据的增删改查
3. 从后台获取到的数据要保存到状态中 才好更新到界面上去显示


## 获取数据==>显示数据==>更新数据

1. 获取的数据要保存到组件的状态上   设计状态     state={}
2. 读取状态的数据显示到界面上       异步获取数据 componentDidMount(){}
3. 数据更新===>状态更新===>render函数从新渲染===>界面更新


## 显示/隐藏功能

1. 设计变量可以设计为一个布尔类型的变量
2. 设计变量可以设计为number类型的变量


## 读取数据

1. const {}=this.state
2. const {}=this.props


# 前台分页与后台分页

## 纯前台页面

   1. 请求获取数据：一次性获取所有数据，翻页时不需要再发请求
   2. 请求接口：需要指定参数：页码(pageNum)和每页数量(pageSize)
   3. 响应数据：返回所有数据的一个数组

## 基于后台的分页

   1. 请求获取数据：每次只获取当前页的数据，翻页时需要发送请求
   2. 请求接口：需要指定请求参数：页码(pageNum)和每页数量(pageSize)
   3. 响应数据：当强页面数据的数组,总记录数 
   4. 总记录数/pageSize=总页数
   
## 如何选择前台分页还是后台分页？？？

   1. 根据数据的多少来选择
   2. 数据少的话用前台分页 一次性拿到所有的数据
   3. 数据多的话用后台分页 一条一条的获取

# 商品管理

1. 主页路由
2. 添加--修改路由
3. 商品详情路由
4. <Route path="/product" component={ProductHome} exact/>
5. exact：完全匹配


## select 标签的值与选项的标签的值相匹配才能显示

      <Select value="1">
        <Option value="1">战三</Option>
        <Option value="2">李四</Option>
      </Select>


## Option用户看到的数据不一定是收集的数据

1. <Option value="1">1</Option>
2. 收集的Option的value值
3. 用户看到的是Option显示的文本


## 组件自身

1. 有需要更新的地方都设置为组件自身的状态
2. 状态更新组件就更新


## 定义了一个函数并在函数中又调用另一函数

1. onChange:(page)=>{this.getProducts(page)} 一般写法
2. onChange:this.getProducts 简写



## 受控组件与非受控组件 自动收集数据

## 受控组件 

1. 定义初始化状态 name:''
2. 给受控标签绑定监听onChang事件
3. 改变状态
4. handle=(e)=>{this.setState({name:e.target.value})}


## 非受控组件

1. 不需要初始化状态
2.  ref={this.input} 绑定ref
3.  this.input.current.value 获取表单的值

        <Select value={searchType} onChange={value=>this.setState({searchType:value})}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>



## event事件对象

1. 代表着发生事件的对象

## 对象内部的属性是没有前后顺序的


## async与await

1. async 函数

    函数的返回值为promise对象
    promise对象的结果由async函数执行的返回值决定

2. await 表达式
    await右侧的表达式一般为promise对象, 但也可以是其它的值
    如果表达式是promise对象, await返回的是promise成功的值
    如果表达式是其它值, 直接将此值作为await的返回值

3. 注意:
    await必须写在async函数中, 但async函数中可以没有await
    如果await的promise失败了, 就会抛出异常, 需要通过try...catch来捕获处理


## async函数的返回值为promise对象 promise对象的值是async函数执行的返回值决定


##　arr.map(()=>{}) 根据原数组产生一个新的数组

 
## 图片上传需要提交图片的地址  上传图片的操作


## 删除图片的操作


## 接口请求参数要看清楚接收的参数类型 字符串或数组或数字

    |参数		   |是否必选 |类型      |说明
    |categoryId    |Y       |string   |分类ID
    |pCategoryId   |Y       |string   |父分类ID
    |name          |Y       |string   |商品名称
    |desc          |N       |string   |商品描述
    |price         |N       |string   |商品价格
    |detail        |N       |string   |商品详情
    |imgs          |N       |array    |商品图片名数组


## 父子组件对象的函数属性数据的传递

1. 子组件对象调用父组件对象的方法：将父组件的方法以函数属性的形式传递给子组件
2. 父组件对象调用子组件对象的方法：ref 获取到子组件对象 再调用子组件的方法


## 父子组件的关系的确立

1. A组件中有B组件的标签
2. A组件就叫父组件  A组件中有B组件标签 才能传标签属性
3. B组件就叫子组件
4. 标签对象就是组件对象
5. ref可以获取到标签对象


# 标签对象就是组件对象 组件对象就是实例对象


## 获取到一个组件对象

1. ref='node'
2. this.refs.node 将指向 DOM 节点
3. ref={(PicturesWall)=>{this.PicturesWall=PicturesWall}}
4. this.PicturesWall.getImgs() 执行组件对象的方法


## 在constructor函数中创建ref对象
       //创建ref
		class MyComponent extends React.Component {
			  constructor(props) {
			    super(props);
			    this.myRef = React.createRef();
			  }
			  render() {
			    return <div ref={this.myRef} />;
			  }
			}
       
         //访问 Refs
         this.myRef.current;
         
         <CustomTextInput ref={this.textInput} />

## 父组件调用子组件对象的方法：使用ref技术

1. 创建ref容器：this.pw=React.createRef()  在构造器中创建的
2. 将ref容器交给需要获取的标签元素:<PictureWall ref={this.pw}/> 自动将标签对象添加为pw对象的current属性
3. 通过ref容器读取标签元素:this.pw.current


##　富文本编译器  Rich Text Editor

1. 可以生成一定网页格式的样式的文本
2. 可以生成一些链接
3. 可以生成图片
4. 可以进行特定格式的处理

## 下载富文本库

1. npm install --save react-draft-wysiwyg draft-js
2. npm draftjs-to-html --save