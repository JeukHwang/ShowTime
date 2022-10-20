export function ID():string {
    return new Date().getTime().toString(36)
        .concat(performance.now().toString(), Math.random().toString())
        .replace(/\./g, "");
}

export function log(...data:any[]) {
    console.log("ShowTime |", ...data);
}

export interface VideoInfo {
    name: string | null
    channel: {
        name: string | null
        img: string | null
    }
    url: string | null
}

export function wait(time:number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    });
}

export function waitFor(func:()=>any, time=500):Promise<void> {
    return new Promise((resolve, reject) => {
      const intervalId:number = setInterval(() => {
        const response = func()
        if (response !== null && response !== undefined) {
          clearInterval(intervalId);
          resolve();
        } else {
            log("fail to resolve", func.toString())
        }
      }, time);
    });
  }

export function waitForElement(selector:string, time=500):Promise<void> {
    return new Promise((resolve, reject) => {
      const intervalId:number = setInterval(() => {
        if (document.querySelector(selector)) {
          clearInterval(intervalId);
          resolve();
        }
      }, time);
    });
  }

  export async function getVideoInfoFromYoutube(): Promise<VideoInfo> {
    await waitForElement("#title > h1 > yt-formatted-string")
    await waitForElement("#text > a")
    // await waitForElement("#avatar")
    await waitFor(function(){return document.querySelector("#avatar")?.children[0]})
    const videoInfo = {
        name: (document.querySelector("#title > h1 > yt-formatted-string") as HTMLDivElement)?.textContent || null,
        channel: {
            name: (document.querySelector("#text > a") as HTMLImageElement)?.textContent || null,
            img: ((document.querySelector("#avatar") as HTMLDivElement).children[0] as HTMLImageElement)?.src || null
        },
        url: window.location.href
    };
    log("videoInfo", videoInfo);
    return videoInfo;
}