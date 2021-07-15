// var script = document.createElement('script');
// script.src = "jquery-3.6.0.js";
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function()
{

    // var testdata={name:"Golu",College:"IIT Guwahati"};
    // $.post("http://localhost:3000/product",testdata,function(data,status)
    // {
    //     console.log(data,"\n",status);
    // });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(request);
            if(request.file==="login")
            {
                $.post("http://localhost:3000/login",request,function(data,status)
                {
                    console.log(data,"  ",status);
                    sendResponse(data);
                    
                });
            }
            if(request.file==="signup")
            {
                $.post("http://localhost:3000/signup",request,function(data,status)
                {
                    console.log(status);
                    sendResponse(data);
                });

            }
            return true;
        });
})