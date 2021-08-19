let form= document.getElementById("form");
form.addEventListener('submit',function(event){
    event.preventDefault();
    let url=document.getElementById("url").value;
    let thresold= document.getElementById("thresold").value;
    // console.log(url,thresold);
    price = "₹"+thresold;
    let data_to_background={
        url:url,
        price:price

    };
    chrome.runtime.sendMessage(data_to_background,function(response){
        console.log(response);
    })

})