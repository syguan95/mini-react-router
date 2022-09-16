import { useEffect } from "react"

const Page1 = (props) => {
  useEffect(() => {
    console.log("page1 history", props.history)
    console.log("page1 location", props.location)
    console.log("page1 match", props.match)
  }, [])

  const clickHandler = () => {
    props.history.push({
      pathname: "/page2/123",
      search: "?key=key2",
      hash: "#target2",
      state: {
        name: "syguan",
        age: "18"
      }
    })
  }
  return (
    <div>
      <div>page1</div>
      <div onClick={clickHandler}>to page2</div>
    </div>
  )
}

export default Page1