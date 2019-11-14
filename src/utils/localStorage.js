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