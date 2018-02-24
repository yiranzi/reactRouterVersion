let miniProgram = {}

miniProgram.isMiniProgram = function () {
  return typeof window !== 'undefined' && window.__wxjs_environment === 'miniprogram'
}

module.exports = miniProgram
