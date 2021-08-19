let form= document.getElementById("form");
// here we are passing url and price given by user to background script ,from where I will send this data to database to save it for future use


form.addEventListener('submit',function(event){
    event.preventDefault();
    let url=document.getElementById("url").value;
    let thresold= document.getElementById("thresold").value;
    // console.log(url,thresold);
    price = "₹"+thresold;
//     making url and price in a json format to pass it to browser ,though this is not only way to do it but I found it convenient.
    let data_to_background={
        url:url,
        price:price

    };
    chrome.runtime.sendMessage(data_to_background,function(response){
        console.log(response);
    })

})
