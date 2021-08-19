

// code on next line is to receive the data which popup.js has send to background
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    $.post("http://localhost:3000/add",request,function(data,status){
        console.log(data);
        console.log(status);
        sendResponse("ok");
    })
    
//     this is must "return true"
    return true;
})


// Here I have made post request to route "urlgiver" in server.js file which will return array of "JSON formatted url and corresponding thresold prices".

let request={};
$.post("http://localhost:3000/urlgiver",request,function(url_and_price_array,status){
    //    console.log(url_and_price_array);
    for(let i=0;i<url_and_price_array.length;i++)
    {
        let url=url_and_price_array[i].url;
        let price=url_and_price_array[i].price;
        let data_to_server={
            url:url,
            price:price

        };
        
//         here i have made a post request to "compare" route in server which return "1" if current price is less than earlier entered thresold price
        $.post("http://localhost:3000/compare",data_to_server,function(decision_about_product,status){
            if(decision_about_product=="1")
            {
                alert("Hey Buy This product");
            }
        });

        
        
    }
});
