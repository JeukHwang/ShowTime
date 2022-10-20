import { viewRecorder } from "./recorder";
import { log } from "./util";

async function main() {
    const url = window.location.href;
    const isUrlYoutubeVideo = /^https:\/\/www\.youtube\.com\/watch/g.test(url);
    if (!isUrlYoutubeVideo) { return; }
    log(`Youtube video is detected | ${window.location.href}`);
    const viewID = await viewRecorder.init();
    const video = document.querySelector("#movie_player > div.html5-video-container > video") as HTMLVideoElement;
    log("video", video)
    video.addEventListener("play", async function (event) { await viewRecorder.play(viewID); });
    video.addEventListener("pause", async function (event) { await viewRecorder.pause(viewID); });
    window.addEventListener("beforeunload", async function (event) { await viewRecorder.pause(viewID); });
}

function observe() {
    var previousUrl = '';
    var observer = new MutationObserver(async function(mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;
        console.log(`URL changed to ${location.href}`);
        await main()
        }
    });

    const config = {subtree: true, childList: true};
    observer.observe(document, config);
}

window.onload = () => { observe(); };