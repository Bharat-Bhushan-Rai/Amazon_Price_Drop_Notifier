// const { Router } = require("express");

var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/signup", {
      templateUrl : "Signup.html",
      controller:"signupcontroller"
    })
    .when("/welcome",{
      templateUrl:"welcome.html"
    })
    .when("/loginerr",{
      templateUrl:"loginerr.html"
    })
    .when("/signuperr",{
      templateUrl:"Signuperr.html"
    })
    
    .otherwise({
      templateUrl : "login.html",
      controller:"logincontroller"
    });
});
  
// $document.ready(function(){

    app.controller("logincontroller",function($scope,$location){
        $scope.submit= function(){
    
          let pass_data_to_bg={
            file:"login",
            user:$scope.name1,
            password:$scope.password1
          };
          chrome.runtime.sendMessage(pass_data_to_bg,function(datareceived){
              console.log(datareceived);
              if(datareceived=="invalid")
              {
                $location.path("/loginerr");
              }
              else
              {
                $location.path("/welcome");
    
              }
          });
    
        };
    });

    app.controller("signupcontroller",function($scope,$location){
        $scope.submit= function(){
    
          let pass_data_to_bg={
            file:"signup",
            user:$scope.name2,
            password:$scope.password2
          };
          chrome.runtime.sendMessage(pass_data_to_bg,function(datareceived){
              console.log(datareceived);
              if(datareceived=="invalid")
              {
                $location.path("/signuperr");
              }
              else
              {
                $location.path("/welcome");
    
              }
          });
    
        };
    });

// })

//  console.log("YE thik hai")
// $(document).ready(function () {
//   $("#form1").submit(function (event) {
//     event.preventDefault();
//     let formData = {
//       file:"login",
//       user: $("#name1").val(),
//       password:$("#password1").val()
      
//     };
//     chrome.runtime.sendMessage(formData,function(datareceived)
//       {
//          if(datareceived==="invalid")
//          {
//             app.controller("logincontroller",function($scope,$location){
//               $location.path("/loginerr");
//             });
//           }
//           else
//           {
//             app.controller("logincontroller",function($scope,$location){
//               $location.path("/welcome");
//             });

//          }
        
//       });
//   });


//   $("#form2").submit(function (event) {
//     event.preventDefault();
//     let formData = {
//       file:"signup",
//       user: $("#name2").val(),
//       password:$("#password2").val()
      
//     };

//     chrome.runtime.sendMessage(formData,function(datareceived)
//       {
//          if(datareceived==="invalid")
//          {
//             app.controller("signupcontroller",function($scope,$location){
//               $location.path("/signuperr");
//             });
//           }
//           else
//           {
//             app.controller("signupcontroller",function($scope,$location){
//               $location.path("/welcome");
//             });

//          }
        
//       });
    
    
//     });
    
//   });
  // console.log(formData.user);
  // console.log(formData.user);