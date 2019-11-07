import axios from 'axios'
export default function ajax(url,data={},type="GET"){
 return new Promise((resolve,reject)=>{
    let promise
    if(type==="GET"){
      let base=''
      Object.keys(data).forEach((item)=>{
        base+=item+'='+data[item]+'&'
      })
      if(base!==''){
        base=base.substr(0,base.lastIndexOf('&'))
        url+='?'+base
      }
      promise=axios.get(url)
    }else{
      promise.axios.post(url,data)
    }
    promise.then((res)=>{
      resolve(res.data)
    }).catch((error)=>{
      reject(error)
    })

  })


}

