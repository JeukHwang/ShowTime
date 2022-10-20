import { ViewData } from "./recorder";

window.onload = () => {
    const viewRawData = document.getElementById("viewRawData") as HTMLTextAreaElement;
    setInterval(async () => {
        const {viewData: data_} = await chrome.storage.sync.get( "viewData");
        const data = JSON.parse(data_) as ViewData;
        viewRawData.value = JSON.stringify(data, null, 4) || "No viewData yet";
    }, 500);
};