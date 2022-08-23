import { Storage } from "@plasmohq/storage"
import { nanoid } from "nanoid"
import { getVideoInfoFromYoutube, VideoInfo } from "./util"

interface View {
  video: VideoInfo
  time: number
  date: number
}

type ViewData = { [key: string]: View }

class ViewRecorder {
  private storage: Storage
  constructor() {
    this.storage = new Storage()
    this.save({})
  }

  public async init(url: string): Promise<string> {
    const viewID = nanoid()
    const viewData = await this.load()
    viewData[viewID] = { video: getVideoInfoFromYoutube(), time: 0, date: Date.now() }
    await this.save(viewData)
    return viewID
  }

  public async play(viewID: string): Promise<void> {
    const viewData = await this.load()
    if (viewID in viewData) {
      const date = Date.now()
      viewData[viewID].date = date
      await this.save(viewData)
    }
  }

  async pause(viewID: string): Promise<void> {
    const viewData = await this.load()
    if (viewID in viewData) {
      const date = Date.now()
      viewData[viewID].time += date - viewData[viewID].date
      viewData[viewID].date = date
      await this.save(viewData)
    }
  }

  private async save(viewData: ViewData): Promise<void> {
    const viewString = JSON.stringify(viewData)
    await this.storage.set("viewData", viewString)
  }

  async load(): Promise<ViewData> {
    const viewString = await this.storage.get("viewData")
    const viewData: ViewData = JSON.parse(viewString)
    return viewData
  }
}

export const viewRecorder = new ViewRecorder()