import React from "react"
import { compareUrlWithPath } from "./publicFunc"
import { RouterContext } from "./Router"
const Route = (props) => {
  const { path, component } = props
  return (
    <RouterContext.Consumer>
      {
        context => {
          var { history, location } = context
          var match = compareUrlWithPath(location.pathname, path)
          var injectProps = { history, location, match }
          if (match) {
            return React.createElement(component, injectProps)
          } else {
            return null
          }
        }
      }
    </RouterContext.Consumer>
  )
}

export default Route