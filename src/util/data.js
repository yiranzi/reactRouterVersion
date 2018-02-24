let dataUtil = {}

dataUtil.isObject = function (obj) {
  let type = typeof obj
  return type === 'object'
}

dataUtil.isEmpty = function (data) {
  if (data == null) return true
  if (dataUtil.isObject(data)) {
    return Object.keys(data).length === 0
  }
  return data.length === 0
}

dataUtil.isNull = function (data) {
  return data === null
}

dataUtil.uuid = function (len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

dataUtil.imgFormat = function (base64, name, type) {
  let text = window.atob(base64.split(',')[1])
  let buffer = new Uint8Array(text.length)
  for (let i = 0; i < text.length; i++) {
    buffer[i] = text.charCodeAt(i)
  }
  let blob = getBlob([buffer], type)
  let formdata = new FormData()
  formdata.append('file', blob, `${name}.${type}`)
  return formdata

  function getBlob (buffer, format) {
    try {
      return new Blob(buffer, {type: format})
    } catch (e) {
      // eslint-disable-next-line
      let bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder)()
      buffer.forEach(function (buf) {
        bb.append(buf)
      })
      return bb.getBlob(format)
    }
  }
}

/**
 * list => [{'name': 'w', 'age': 11}, {'name': 'x', 'age': 12}]
 * name => 'name'
 * return {'w': [{'name': 'w', 'age': 11}], 'x': [{'name': 'x', 'age': 12}]}
 * @param {Array} list 
 * @param {string} name 
 */

dataUtil.groupBy = function (list, name) {
  if (dataUtil.isEmpty(list)) return []
  if (dataUtil.isEmpty(name)) return list
  let json = {}
  list.forEach((item) => {
    json[item[name]] = json[item[name]] || []
    json[item[name]].push(item)
  })
  return json
}

module.exports = dataUtil
