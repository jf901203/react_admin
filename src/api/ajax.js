/*
 能发异步ajax请求的函数模块
 封装axios库
 函数的返回值是promise对象
 用axios发异步的ajax请求
 axios.get() 返回的是一个promise对象  所以可以promise=axios.get()  promise.then(()=>{})
 axios.get().then()

 优化：统一处理请求异常


*/

import axios from 'axios'
import  {message} from 'antd'
export default function ajax(url,data={},type="GET"){
  // 返回一个promise resolve()会触发promise.then()的调用
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
      promise=axios.get(url,{ //配置对象  params指定的query的参数
        params:data //指定请求的参数
      }
      )
    }else{
      promise=axios.post(url,data)
    }
    // axios返回的promise对象请求成功了会触发then()回调函数
    promise.then((response)=>{
      // 会触发promise对象的then()方法调用
      resolve(response.data)
    }).catch((error)=>{
     // reject(error.message)
     message.error('请求出错了'+ error.message)
    })
  })
}

