import type { PlasmoContentScript } from "plasmo"
import { viewRecorder } from "~functions/recorder"
import { log } from "~functions/util"

export const config: PlasmoContentScript = {
  matches: ["https://www.youtube.com/*"],
  run_at: "document_start"
}

async function main() {
  const url = window.location.href
  const isUrlYoutubeVideo = /^https:\/\/www\.youtube\.com\/watch/g.test(url)
  if (!isUrlYoutubeVideo) {
    return
  }
  log(`Youtube video matched! | ${window.location.href}`)
  const viewID = await viewRecorder.init(url)
  const video: HTMLVideoElement = document.querySelector(
    "#movie_player > div.html5-video-container > video"
  )
  video.addEventListener("play", async function (event) {
    await viewRecorder.play(viewID)
  })
  video.addEventListener("pause", async function (event) {
    await viewRecorder.pause(viewID)
  })
  window.addEventListener("beforeunload", async function (event) {
    await viewRecorder.pause(viewID)
  })
}

window.onload = () => {
  main()
}