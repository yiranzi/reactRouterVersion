const DataUtils = require('./data')
const fs = require('fs')
const cheerio = require('cheerio')
const path = require('path')

let ToolsUtil = {}
// 添加图片类型后缀
// ToolsUtil.addByType = function (imgUrl, type) {
//   let name
//   switch (type) {
//     case 'native':
//       name = '_0'
//       break
//     case 'show':
//       name = '_1'
//       break
//   }
//   let stringArr = ['.jpg', '.png', '.jpeg']
//   let resultUrl
//   let result = stringArr.find((reg, index) => {
//     return (imgUrl.search(new RegExp(reg)) !== -1)
//   })
//   if (result !== -1) {
//     resultUrl = imgUrl.replace(result, name) + result
//   } else {
//     resultUrl =  imgUrl
//   }
//   return resultUrl
// }

// 获取url参数
ToolsUtil.getQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

ToolsUtil.parseHtml = function (content) {
  const data = cheerio.parseHTML(content, {
    decodeEntities: false
  })

  let array = []

  data.map((item, index) => {
    let wrap = cheerio.load(item).html()
    wrap = wrap.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    let video = wrap.match(/video/)
    let training = wrap.match(/traning/i)
    if (video) {
      let src = wrap.match(/src="([^"]*)"/)
      let playerId = 'player_' + DataUtils.uuid(11)
      array.push({
        'html': {
          content: `<video id="${playerId}" class="video-js" style="display:none;"></video>`
        }
      })
      array.push({
        'video': {
          playerId: playerId,
          src: src[1].replace(/https:/, 'http:')
        }
      })
      // 有练习
    } else if (training) {
      let id = wrap.match(/id="([^"]*)"/)
      array.push({
        'traning': {
          id: id[1]
        }
      })
    } else {
      array.push({
        'html': {
          content: wrap
        }
      })
    }
  })
  return array
}

// 遍历文件夹
ToolsUtil.walkDir = function (dir, files) {
  files = files || []
  fs.readdirSync(dir).forEach((file) => {
    let filePath = `${dir}/${file}`
    let stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      ToolsUtil.walkDir(filePath, files)
    } else {
      files.push(filePath)
    }
  })
}

// next.config.js exportPathMap
ToolsUtil.exportPathMap = function () {
  const dir = path.join(__dirname, '../pages')

  let files = []
  ToolsUtil.walkDir(dir, files)
  let pathMap = {}
  files.forEach((file) => {
    let filePath = file.replace(dir, '').replace('.js', '')
    pathMap[filePath] = {page: filePath}
  })
  return pathMap
}

// 图片路径
ToolsUtil.isImg = function (str) {
  return str.match(/.*png$/) || str.match(/.*jpg/) || str.match(/.*jpeg/)
}

// mp3文件
ToolsUtil.isMp3 = function (str) {
  return str.match(/.*mp3/)
}

// mp4文件
ToolsUtil.isMp4 = function (str) {
  return str.match(/.*mp4/)
}

// 是字符串
ToolsUtil.isString = function (str) {
  return typeof str === 'string'
}

// 单选题
ToolsUtil.isRadio = function (type) {
  return parseInt(type) === 1
}

// 多选题
ToolsUtil.isCheckBox = function (type) {
  return parseInt(type) === 2
}

// 上传图片
ToolsUtil.isUploader = function (type) {
  return parseInt(type) === 3
}

// 文本题
ToolsUtil.isTextarea = function (type) {
  return parseInt(type) === 4
}

// 上传音频
ToolsUtil.isRecord = function (type) {
  return parseInt(type) === 5
}

// 是否空字符串
ToolsUtil.strIsEmpty = function (str) {
  return str === null || (str !== null && str.trim() === '')
}

// 是否手机号
ToolsUtil.isPhone = function (str) {
  return /^1\d{10}$/.test(str)
}

// 是否邮箱
ToolsUtil.isMail = function (str) {
  // eslint-disable-next-line max-len
  return /^\b(^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$)\b$/.test(str)
}

// 环境
ToolsUtil.getEnv = function () {
  return process.env.NODE_ENV
}

ToolsUtil.isDev = function () {
  return ToolsUtil.getEnv() === 'development'
}

ToolsUtil.isProd = function () {
  return ToolsUtil.getEnv() === 'production'
}

ToolsUtil.isRC = function () {
  return ToolsUtil.getEnv() === 'rc'
}

ToolsUtil.replaceAll = function (str, s1, s2) {
  return str.replace(new RegExp(s1, 'gm'), s2)
}

module.exports = ToolsUtil
