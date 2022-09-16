//path生成正则表达式，与pathname进行正则匹配，并获取动态路由参数
function compareUrlWithPath(pathname, path) {
  var keyRegexp = /(?<=\/\:)([a-zA-Z0-9]+)(?=\/|$)/g
  var keys = path.match(keyRegexp)//获取动态参数的key
  var regSt = "^" + path.replace(/(?<=\/)(:[a-zA-Z0-9]+)(?=\/|$)/g, "([a-zA-Z0-9]+)") + "$"
  var pathRegexp = new RegExp(regSt)
  var match = pathRegexp.exec(pathname)//pathname正则匹配，获取捕获动态参数的value
  if (!match) {
    return null
  } else {
    var [url, ...values] = match
    var result = {
      path,
      url,
      params: {},
      isExact: true,
    }
    keys.forEach((key, index) => {
      result.params[key] = values[index]
    });
    return result
  }
}

export {
  compareUrlWithPath
}