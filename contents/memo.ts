export {}
// import type { PlasmoContentScript } from "plasmo";

// export const config: PlasmoContentScript = {
//   matches: ["https://www.youtube.com/*"],
//   run_at: "document_start"
// }

// function dynamicallyLoadScript(url) {
//     const script = document.createElement("script");  // create a script DOM node
//     script.src = url;  // set its src to the provided URL
//     document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
// }

// function insertScript(url) {
//     var tag = document.createElement('script');
//     tag.src = url;
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// }
// var vid = $('video').get(0);

// vid.addEventListener('ended', function(e) {
//     console.log('The video ended!');
// });
// async function main() {
//     const scriptYoutube = "https://www.youtube.com/iframe_api";
//     // const YT = await import(scriptYoutube);
//     // dynamicallyLoadScript("https://www.youtube.com/iframe_api");
//     insertScript(scriptYoutube);
//     console.log();
//     const url = window.location.href;
//     const isUrlYoutubeVideo = url.match(/^https:\/\/www\.youtube\.com\/watch/g);
//     if (isUrlYoutubeVideo) {
//         console.log(`ShowTime | Youtube video matched! | ${window.location.href}`);
//     }
//     // const video = document.querySelector("#movie_player > div.html5-video-container > video");
//     // video.addEventListener("enterpictureinpicture", (event) => {
//     //     // Video entered Picture-in-Picture mode.
//     //     const pipWindow = event.pictureInPictureWindow;
//     //     console.log(<code data-opaque bs-autolink-syntax='`Picture-in-Picture window width: ${pipWindow.width}`'>Picture-in-Picture window width: ${pipWindow.width}</code>);
//     //     console.log(<code data-opaque bs-autolink-syntax='`Picture-in-Picture window height: ${pipWindow.height}`'>Picture-in-Picture window height: ${pipWindow.height}</code>);
//     //   });
// }

// main();
