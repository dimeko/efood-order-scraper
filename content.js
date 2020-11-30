
var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    console.log("Didn't get the data");

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    var id = event.data.text[0];
    var url = event.data.text[1];
    var store_id = event.data.text[2];
    var store_name = event.data.text[3];

    var details = event.data.text;

    console.log(store_name);

    chrome.storage.local.set({url: url});

    chrome.runtime.sendMessage({'message': 'send_id' , 'data': details},function(response){
        if(response.response = "done"){
            console.log(response.response);
        }
    });

    port.postMessage(event.data.text);
  }
}, false);
