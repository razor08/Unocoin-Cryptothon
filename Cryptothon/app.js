var express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./models/user");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/unocoin");

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is up and running!"); 
});