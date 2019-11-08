
/*

包含n个接口请求函数的模块
每个函数返回的都是promise对象
每个请求ajax请求的路劲和方式是固定的 唯一变化是请求的参数
唯一变的是参数
ajax('/login',{username:'zhang',password:'123'},'POST')

*/

import ajax from './ajax'
export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST')
export const reqAddUser=({password,username,phone,email,role_id})=>ajax('/manage/user/add',{password,username,phone,email,role_id },'POST')
export const reqUpdateUser=({_id,username,phone,email,role_id})=>ajax('/manage/user/update',{_id,username,phone,email,role_id},'POST')

