import { useEffect } from "react"

const Page2 = (props) => {
  useEffect(() => {
    console.log("page2 history", props.history)
    console.log("page2 location", props.location)
    console.log("page2 match", props.match)
  }, [])
  return (
    <div>page2</div>
  )
}

export default Page2