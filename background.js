var id;
var store_id;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message=="send_id"){
        console.log('mesa sto proto');
        id = request.data[0];
        store_id = request.data[3];
        sendResponse = "done";
        console.log(id);
        console.log(store_id);
    }
    else if(request.message=='send'){
        console.log('mesa sto deutero');

    var xhr = new XMLHttpRequest();
    // var  url = "http://sampleproject-env.eba-d26fhkqt.us-east-2.elasticbeanstalk.com/api/order";
    var  url = "http://mitsosdomain.com/api/order";
 
    xhr.open("POST", url, true); 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    var sender = request.data;

    sender.id = id;
    sender.store_id = store_id;

    sender.orders = sender.orders.map( function(item) {
        return JSON.stringify(item);
    });
    
    const sendd = JSON.stringify(sender);

    console.log(sendd);
    xhr.send(sendd); 

    chrome.tabs.create({url: "http://mitsosdomain.com/see-order"});
    // window.location.replace("http://mitsosdomain.com/see-order");
    // chrome.runtime.sendMessage({'message': 'redirect'})
    }else{
        console.log("Not now");
    }

 });
