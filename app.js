var express = require("express"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post("/login", function(req, res){
    console.log(req.body);
   var email = req.body.email;
   var passw = req.body.password;
   if ((email === "rahulthebest.sinha@gmail.com") && passw === "team45@890") {
       var js = "{\"result\":\"success\",\"message\":\"c6ce54622ea8b8ea9a024deb44d1fbdcb00bea29\",\"status_code\":200}"
       res.send(js);
   } else if ((email === "rahulthebest.form@gmail.com") && passw === "team45@890"){
       var js = "{\"result\":\"success\",\"message\":\"b9b3f9674d5b1b0724ce7b8b10145eb103e86ff0\",\"status_code\":200}"
       res.send(js);
   } else if ((email === "jaysinha.bestindwrld@gmail.com") && passw === "team45@890"){
       var js = "{\"result\":\"success\",\"message\":\"d407c38d28087b93513fbff2816a64a25b9bafa4\",\"status_code\":200}"
       res.send(js);
   }
   else {
        var js = "{\"result\":\"failure\",\"message\":\"Invalid credentials!\",\"status_code\":400}"
       res.send(js);
   }
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is up and running!"); 
});