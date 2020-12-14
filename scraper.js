order = {
    "orders": [
    {
        "itemName": "first",
        "itemDes": "first",
        "itemQuan": 1,
        "itemPr": 1,
    }
    ],
    "id": "",
    "store_id": "",
}

async function scrapePage(){
    var itemsNum = document.getElementsByClassName('cart-product-list')[0].children;
    // var objJson = JSON.parse(Order);

    for (var i=0;i<itemsNum.length;i++){
    
        var a = itemsNum[i].firstChild.firstChild.nextSibling.firstChild.textContent;
        var b = itemsNum[i].firstChild.lastChild.textContent;
        var c = itemsNum[i].lastChild.firstChild.textContent;
        var d = itemsNum[i].lastChild.lastChild.firstChild.textContent;

        var newOrder = {
            itemName: a,
            itemDes: b,
            itemQuan: c,
            itemPr: d,
        };

        // let Temp = JSON.stringify(newOrder);
        order.orders[i] = newOrder; 
    }
}

scrapePage();

chrome.runtime.sendMessage({'message': 'send_order' , 'data': order}, function(response) {
    if(response.answer = "done"){
        console.log("done");
    }
});

