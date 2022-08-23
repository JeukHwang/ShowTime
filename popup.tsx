import { useState } from "react"
import { viewRecorder } from "~functions/recorder"
import { log } from "~functions/util"

function IndexPopup() {
  const [data, setData] = useState("")

  const [watch, setWatch] = useState("")
  setInterval(async () => {
    const viewData = await viewRecorder.load();
    log("watch", Object.freeze(viewData))
    setWatch(JSON.stringify(viewData))
  }, 1000)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
      <p>{watch}</p>
    </div>
  )
}

export default IndexPopup
