let DateUtil = {}

// 日期格式化
DateUtil.format = function (date, fmt) {
  // date为null
  if (!date) {
    return
  }
  if (typeof date === 'string' || typeof date === 'number') {
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/').replace(/T/g, ' ')
      if (date.length > 19) {
        date = date.substring(0, 19)
      }
    }
    date = new Date(date)
  }
  // yyyy-MM-dd hh:mm:ss
  // yyyy年MM月dd日 hh时mm分ss秒S毫秒
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1,
        (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

DateUtil.diffDay = function (endTime) {
  let d1 = DateUtil.format(endTime, 'yyyy-MM-dd')
  let d2 = DateUtil.format(new Date(), 'yyyy-MM-dd')
  d1 = new Date(d1)
  d2 = new Date(d2)
  var days = d1.getTime() - d2.getTime()
  var time = parseInt(days / (1000 * 60 * 60 * 24))
  return time
}

DateUtil.diffTime = function (dateStr1, dateStr2) {
  let d1 = DateUtil.format(dateStr1, 'yyyy-MM-dd hh:mm:ss')
  let d2 = DateUtil.format(dateStr2, 'yyyy-MM-dd hh:mm:ss')
  d1 = new Date(d1.replace(/-/g, '/'))
  d2 = new Date(d2.replace(/-/g, '/'))
  var time = d1.getTime() - d2.getTime()
  return time
}

DateUtil.formatMonth = function (date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  if (typeof date === 'string') {
    return months[new Date(date).getUTCMonth()]
  } else if(typeof date === 'object') {
    return months[date.getUTCMonth()]
  } else {
    return null
  }
}

DateUtil.formatDay = function (date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  if (typeof date === 'string') {
    return days[new Date(date).getUTCDay()]
  } else if(typeof date === 'object') {
    return days[date.getUTCDay()]
  } else {
    return null
  }
}

module.exports = DateUtil
