function Emitter() {
  this.listener = []
  this.listen = (func) => {
    if (this.listener.indexOf(func) === -1) {
      this.listener.push(func)
    }
    return () => { this.unlisten(func) }
  }
  this.unlisten = (func) => {
    if (this.listener.indexOf(func) !== -1) {
      var index = this.listener.indexOf(func)
      this.listener.splice(index, 1)
    }
  }
  this.emit = (location) => {
    this.listener.forEach(item => { item(location) })
  }
}

function createHistory(props) {

  var { basename } = props

  var emitter = new Emitter()

  //页面初始化时，初始化location对象
  function initialLocation() {
    //刷新不会导致state丢失
    var state = window.history.state
    var location = getLocation(state)
    return location
  }

  window.addEventListener("popstate", popStateHandler)

  //处理前进后退的情况
  function popStateHandler(event) {
    //前进后退不会导致state丢失
    var state = event.state
    var location = getLocation(state)
    setState(location)
  }

  function getLocation(state) {
    var pathname = basename ? window.location.pathname.replace(new RegExp("^" + basename), "") : window.location.pathname
    var search = window.location.search
    var hash = window.location.hash
    var location = {
      pathname,
      search,
      hash,
      state
    }
    return location
  }

  function setState(location) {
    history.length = window.history.length
    history.location = location
    //location更新，触发Router重新渲染
    emitter.emit(location)
  }

  //history 导航
  function go(n) {
    window.history.go(n)
  }
  //后退
  function goBack() {
    window.history.go(-1)
  }
  //前进
  function goForward() {
    window.history.go(1)
  }
  //页面跳转
  /**
    location{
      pathname,
      search,
      hash,
      state,
      xxx,
    }
   */
  function push(location) {
    var { pathname, search, hash, state } = location
    var pathname = basename + pathname
    var url = pathname + search + hash
    window.history.pushState(state, "", url)
    setState(location)
  }
  //返回的history对象
  const history = {
    length: window.history.length,
    location: initialLocation(),
    go: go,
    goBack: goBack,
    goForward: goForward,
    push: push,
    listen: emitter.listen
  }
  return history
}
export default createHistory