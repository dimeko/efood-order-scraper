
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

let final_order;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message='send_order'){
 
        final_order = request.data;
        var items='';
        var temp='';

        for(var i=0;i<request.data.orders.length;i++){
            items = items.concat( 
                `<li><strong> Item ${i+1}</strong>
                 <ul>
                 <li>${request.data.orders[i].itemName}</li>
                 <li>${request.data.orders[i].itemDes=='' ? '(empty description)' : request.data.orders[i].itemDes.replace(",ή επιλέξτε υλικά","")}</li> 
                 <li>${request.data.orders[i].itemQuan}</li> 
                 <li>${request.data.orders[i].itemPr}</li> </ul>
                 </li>`
            );
        }
        const new_order = document.getElementById('order').innerHTML = `<ol>${items}</ol>`;
        var old_button = document.getElementById('upper-button').innerHTML = '<button style="text-decoration: none; width: 100%;" id="send-order"><strong><h2>Send Order</h2></strong></button>';
         
        sendResponse({answer: "done"}); 
    }
});

document.body.addEventListener('click',function(e){
    if(e.target && e.target.id== 'send-order'){
        console.log(final_order);
        chrome.runtime.sendMessage({'message': 'send' , 'data': final_order});
   }
});
