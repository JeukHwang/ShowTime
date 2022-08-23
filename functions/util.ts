export function log(...params: any[]) {
  console.log("ShowTime |", ...params)
}

export interface VideoInfo {
    name: string
    channel: {
        name: string
        img: string
    }
    url: string
}

export function getVideoInfoFromYoutube(): VideoInfo {
    const videoInfo = {
        name: document.querySelector("#title > h1 > yt-formatted-string").textContent,
        channel: {
            name: document.querySelector("#text > a").textContent,
            img: (document.querySelector("#img") as HTMLImageElement).src
        },
        url: window.location.href
    }
    return videoInfo
}