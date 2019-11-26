
/*

包含n个接口请求函数的模块
每个函数返回的都是promise对象
每个请求ajax请求的路劲和方式是固定的 唯一变化是请求的参数
唯一变的是参数
ajax('/login',{username:'zhang',password:'123'},'POST')

*/

import jsonp from 'jsonp'
import { message} from 'antd'

// ajax发送请求函数
import ajax from './ajax'




// 登入接口函数
export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST')
// 添加接口函数
export const reqAddUser=({password,username,phone,email,role_id})=>ajax('/manage/user/add',{password,username,phone,email,role_id },'POST')
// 更新接口函数
export const reqUpdateUser=({_id,username,phone,email,role_id})=>ajax('/manage/user/update',{_id,username,phone,email,role_id},'POST')
// 用户接口函数
export const reqList=()=>ajax('/manage/user/list')
// 删除用户接口函数
export const reqDelete=(userId)=>ajax('/manage/user/delete',{userId},'POST')


// 获取一级分类或二级分类的接口函数
export const reqCategory=(parentId)=>ajax('/manage/category/list',{parentId})
// 添加类别接口函数 参数的写法 两个参数  // 添加子分类
export const reqAddCategory=({parentId,categoryName})=>ajax('/manage/category/add',{parentId,categoryName},'POST')
// 更改类别接口函数 参数的写法 这个是一个参数 参数是一个对象
export const reqUpdateCategorye=({categoryId,categoryName})=>ajax('/manage/category/update',{categoryId,categoryName},'POST')


// 根据分类ID获取分类
export const reqInfo=(categoryId)=>ajax('/manage/category/info',{categoryId})

// 获取商品分页列表
export const reqProduct=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})

// 根据名称搜索产品分页列表 
// searchType：productName/productDesc 一个变量作为对象的属性值[searchType]
// 一个接口函数 搞定两种搜索的请求
export const reqSearchName=({pageNum,pageSize,searchType,searchName})=>ajax('/manage/product/search',{
   pageNum,
   pageSize,
   [searchType]:searchName
})



// 添加商品  更新商品的差别就是有没有商品的_id

export const reqAddProduct=(product)=>ajax('/manage/product/add',product,'POST')

// 更新商品
export const reqUpdateProduct=(product)=>ajax('/manage/product/update',product,'POST')


// 对商品进行上架/下架处理
export const reqUpdateStatus=({productId,status})=>ajax('/manage/product/updateStatus',{productId,status},'POST')


// 删除图片的接口函数

export const reqDeleteImg=(name)=>ajax('/manage/img/delete',{name},'POST')

// jsonp接口请求函数
export const reqWeather=(city)=>{
   return new Promise((resolve,reject)=>{
    const url=` http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data)=>{  
    //   如果成功的返回了数据 就把数据交出去
    if(!err || data.status==='success'){
       const {dayPictureUrl,weather} =data.results[0].weather_data[0]
       const {date}=data
       const res={
        dayPictureUrl,
        weather,
        date
       }
    //    把数据交出去  await===>promise.then()
       resolve(res) 
    }else{
        // 如果失败了
      message.error('获取天气数据失败')
    }
    })
   })
    

}

