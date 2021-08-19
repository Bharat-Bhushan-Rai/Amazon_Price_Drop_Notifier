const express = require("express");
const bodyparser = require("body-parser");
const mongoose= require("mongoose");
const puppeteer =require("puppeteer");

const app= express();

app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/chromedatabase",{useUnifiedTopology:true,useNewUrlParser:true});

const userschema= new mongoose.Schema({
    url:String,
    price:String
});
const Product= mongoose.model("Product",userschema);

// this route is to handle data wich we receive from form in popup.html
// if the given url is not present in document then it add the url and price to database else it update the price to that url


app.post("/add",function(req,res){
    let url=req.body.url;
    let price= req.body.price;
    Product.find({url:url},function(err,founditems){
        if(founditems.length==0)
        {
            const add= new Product({url:url,price:price});
            add.save();
            console.log("saved");
        }
        else
        {
            Product.updateOne({url:url},{price:price});
            console.log("updated");
        }
    })
    res.send("succesfully saved");
})


// this route is to reuturn array of url and corresponding thresold price to background script

app.post("/urlgiver",function(req,res){

    
    Product.find({},function(err,founditems){
        // console.log(founditems);
        res.send(founditems);
    });
    
});

// this route is to compare current price of product to the thresold price of product earlier mentioned
// if cuurent price is less than thresold price then it send "1" as response to call which was called in background.js
// I have used puppeteer module of npm to extract current price of product,by calling url from server.js itself
app.post("/compare",function(req,res){
    let link = req.body.url;
    let comparing_price= req.body.price;


    (async ()=>{
        const browser= await puppeteer.launch();
        const page= await browser.newPage();
        await page.goto(link);
        // await browser.waitForTarget(()=>false);
        const result = await page.evaluate(()=>{
            
            let price1= document.querySelector("#priceblock_dealprice");
            if(price1==null)
            {
                price1= document.querySelector("#priceblock_ourprice");

            }
            let price= price1.innerText;
            
            return price;
        });
        
        if(result<=comparing_price)
        {
            res.send("1");
        }
        else
        {
            res.send("0");
        }

    
        await browser.close();
    })();
})

app.listen(3000,function()
{
    console.log("Hello World");
});
