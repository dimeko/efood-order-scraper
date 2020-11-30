
let scrapePage = document.getElementById('scrapePage');

scrapePage.onclick = function() {chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.storage.local.get("url", function(data) {
        if(typeof data.url == "undefined") {
            if(!tabs[0].url.includes('https://www.e-food.gr'))
            {
               alert('Please go to eFood');
               return;
            }   
            } else if (!tabs[0].url.includes(data.url[1])){
                alert('Please Go to ' + data.url[2]);
                return
            } else if (tabs[0].url.includes(data.url[1])){
                chrome.tabs.executeScript(tabs.id, {file: "scraper.js"});
            }
    }); 
});
}

