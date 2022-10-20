import { getVideoInfoFromYoutube, ID, log, VideoInfo, wait } from "./util";

export interface View {
  video: VideoInfo
  time: number
  date: number
}

export type ViewData = { [key: string]: View }

class ViewRecorder {
    storage: Storage
    constructor() {
        this.storage = window.localStorage;
        this.save({});
    }

    async init():Promise<string> {
        wait(1000);
        const viewID = ID();
        const viewData = await this.load();
        viewData[viewID] = { video: await getVideoInfoFromYoutube(), time: 0, date: Date.now() };
        await this.save(viewData);
        return viewID;
    }

    async play(viewID:string):Promise<void> {
        const viewData = await this.load();
        if (viewID in viewData) {
            const date = Date.now();
            viewData[viewID].date = date;
            await this.save(viewData);
        }
    }

    async pause(viewID:string):Promise<void> {
        const viewData = await this.load();
        if (viewID in viewData) {
            const date = Date.now();
            viewData[viewID].time += date - viewData[viewID].date;
            viewData[viewID].date = date;
            await this.save(viewData);
        }
    }

    async save(viewData:ViewData):Promise<void> {
        const viewString = JSON.stringify(viewData);
        // await this.storage.setItem("viewData", viewString);
        await chrome.storage.sync.set({"viewData": viewString});
    }

    async load():Promise<ViewData> {
        // const viewString= await this.storage.getItem("viewData")!;
        const {viewData: viewString} = await chrome.storage.sync.get( "viewData");
        const viewData = JSON.parse(viewString);
        log(viewData);
        return viewData;
    }
}

export const viewRecorder = new ViewRecorder();