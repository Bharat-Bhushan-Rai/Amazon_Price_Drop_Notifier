const express = require("express");
const bodyparser = require("body-parser");
const mongoose= require("mongoose");


const app= express();

app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/chromedatabase",{useUnifiedTopology:true,useNewUrlParser:true});


// mongoose.connect("mongodb+srv://Bharat:test123@cluster0.xjwb1.mongodb.net/myFirstDatabase",{useUnifiedTopology:true,useNewUrlParser:true},function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("Succesfully connected");
//     }
// });
const userschema= new mongoose.Schema({
    user:String,
    password:String
});

const User= mongoose.model("User",userschema);

app.post("/signup",function(req,res){
    let user=req.body.user;
    let password=req.body.password;
    User.find({user:user},function(err,founditems)
    {
        if(founditems.length==0)
        {
            const nuser= new User({user:user,password:password});
            nuser.save();
            console.log("user Saved");
            res.send("valid");
        }
        else
        {
            res.send("invalid");
        }
    });
    // console.log("signup is okay")
    });

    app.post("/login",function(req,res){
        
        let user=req.body.user;
        let password=req.body.password;
        User.find({user:user,password:password},function(err,founditems)
        {
            if(founditems.length==0)
            {
                res.send("invalid")
            }
            else
            {
                
                res.send("valid");
            }
        })
        // console.log(req.body.user);
        // res.send("Good Job");
    })

app.post("/product",function(req,res)
{
    console.log(req.body);
    res.send("hello World");
})

app.listen(3000,function()
{
    console.log("Hello World");
})