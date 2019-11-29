import format from'date-fns/format'
export default function moment(date,formatStr='yyyy-MM-dd HH:mm:ss'){
  
  if(date){
    return format(date, formatStr)
  }
  

}

