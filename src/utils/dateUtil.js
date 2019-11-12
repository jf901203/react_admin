import format from'date-fns/format'
export default function moment(date,formatStr='yyyy-MM-dd HH:mm:ss'){

  return format(date, formatStr)

}

