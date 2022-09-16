import { createContext, useEffect, useState } from "react"

export const RouterContext = createContext()

const Router = (props) => {
  const { history, children } = props
  //通过location的变化触发重新渲染
  const [location, setLocation] = useState(history.location)

  useEffect(() => {
    //监听history中location的变化
    var unlisten = history.listen((newLocation) => {
      setLocation(newLocation)
    })
    return unlisten
  }, [])


  return (
    <RouterContext.Provider value={{
      history: history,
      location: location,
      match: {}
    }}>
      {children}
    </RouterContext.Provider>
  )
}

export default Router