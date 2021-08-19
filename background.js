// const puppeteer =require("puppeteer");


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    $.post("http://localhost:3000/add",request,function(data,status){
        console.log(data);
        console.log(status);
        sendResponse("ok");
    })
    return true;
})

// function to retrieve 


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
        
        $.post("http://localhost:3000/compare",data_to_server,function(decision_about_product,status){
            if(decision_about_product=="1")
            {
                alert("Hey Buy This product");
            }
        });

        // // let link=url;


        // (async ()=>{
        //     const browser= await puppeteer.launch();
        //     const page= await browser.newPage();
        //     await page.goto(link);
        //     // await browser.waitForTarget(()=>false);
        //     const result = await page.evaluate(()=>{
                
        //         let price1= document.querySelector("#priceblock_dealprice");
        //         if(price1==null)
        //         {
        //             price1= document.querySelector("#priceblock_ourprice");

        //         }
        //         let price= price1.innerText;
                
        //         return price;
        //     });
            
        //     if(result<=comparing_price)
        //     {
        //         alert("Hey You Can Buy It");
        //     }

        
        //     await browser.close();
        // })();
    }
});