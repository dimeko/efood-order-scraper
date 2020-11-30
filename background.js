var id;
var store_id;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message=="send_id"){
        id = request.data[0];
        store_id = request.data[3];
        sendResponse = "done";
        console.log(id);
    }
    else if(request.message=='send'){
    var xhr = new XMLHttpRequest();
    // var  url = "http://SampleProject-env.eba-d26fhkqt.us-east-2.elasticbeanstalk.com/api/order";
    var  url = "http://mitsosdomain.com/api/order";
 
    xhr.open("POST", url, true); 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    var sender = request.data;

    sender.id = id;
    sender.store_id = store_id;
    
    const sendd = JSON.stringify(sender);
    console.log(sendd);
    xhr.send(sendd); 

    sendResponse({answer: "done"});

    // chrome.tabs.update({url: "http://SampleProject-env.eba-d26fhkqt.us-east-2.elasticbeanstalk.com/order"});
    chrome.tabs.update({url: "http://mitsosdomain.com/see-order"});
    }else{
        console.log("Not now");
    }

 });
