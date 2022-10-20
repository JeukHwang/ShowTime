import { View, ViewData } from "./recorder";
import { log } from "./util";

class Viewer extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render(){
        this.attachShadow({mode:"open"});
        const template = document.getElementById("view-template") as HTMLTemplateElement;
        this.shadowRoot!.append(template.content.cloneNode(true));
        
        const channelImg = this.shadowRoot!.querySelector(".channel-img") as HTMLImageElement;
        channelImg.src = this.getAttribute("channel-img") || "";
        const channelName = this.shadowRoot!.querySelector(".channel-name") as HTMLParagraphElement;
        channelName.textContent = this.getAttribute("channel-name") || "";
        const videoName = this.shadowRoot!.querySelector(".video-name") as HTMLParagraphElement;
        videoName.textContent = this.getAttribute("video-name") || "";
        const videoTime = this.shadowRoot!.querySelector(".video-time") as HTMLParagraphElement;
        videoTime.textContent = this.getAttribute("video-time") || "";
        const videoDate = this.shadowRoot!.querySelector(".video-date") as HTMLParagraphElement;
        const dateNumber = parseInt(this.getAttribute("video-date")!);
        videoDate.textContent = new Date(dateNumber!).toISOString().split("T")[0] || "";
    }

    static get observedAttributes() {
        return 
    }

    attributeChangedCallback() {
        this.render();
    }
}
customElements.define("custom-viewer", Viewer);

window.onload = () => {
    const viewHistory = document.getElementById("viewHistory") as Viewer;
    function addView(view: View) {
        const viewer = document.createElement("custom-viewer") as Viewer;
        viewer.setAttribute("channel-img", view.video.channel.img);
        viewer.setAttribute("channel-name", view.video.channel.name);
        viewer.setAttribute("video-name", view.video.name);
        viewer.setAttribute("video-time", view.time.toString());
        viewer.setAttribute("video-date", view.date.toString());
        viewHistory.appendChild(viewer);
    }
    setInterval(async () => {
        // const data = localStorage.getItem("viewData");
        const {viewData: data_} = await chrome.storage.sync.get( "viewData");
        const data = JSON.parse(data_) as ViewData;
        log("popup - rawData", data);
        while(viewHistory.firstChild) {
            viewHistory.removeChild(viewHistory.firstChild);
        }
        Object.values(data).forEach((value) => {
            addView(value);
        })
    }, 500);
};