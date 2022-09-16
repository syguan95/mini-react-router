import Router from "./Router"
import createHistory from "./history"
const BrowserRouter = (props) => {
  const history = createHistory(props)
  return (
    <Router history={history}>{props.children}</Router>
  )
}

export default BrowserRouter