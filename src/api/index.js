
/*

包含n个接口请求函数的模块
每个函数返回的都是promise对象
每个请求ajax请求的路劲和方式是固定的 唯一变化是请求的参数
唯一变的是参数
ajax('/login',{username:'zhang',password:'123'},'POST')

*/
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
// 类别接口函数
export const reqCategory=(parentId)=>ajax('/manage/category/list',{parentId})
// 添加类别接口函数
export const reqAddCate=(parentId,categoryName)=>ajax('/manage/category/add',{parentId,categoryName},'POST')
// 更改类别接口函数
export const reqUpdateCate=(categoryId,categoryName)=>ajax('/manage/category/update',{categoryId,categoryName},'POST')
// 根据ID获取分类
export const reqInfo=(categoryId)=>ajax('/manage/category/info',{categoryId})
// 获取商品列表接口函数
export const reqProduct=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})
