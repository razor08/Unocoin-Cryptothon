var express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Users = require("./models/users"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/unicoin3");
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
    secret: "I am the best in the world!",
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next){
   res.locals.currentUsers = req.Users;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in!");
        res.redirect("/login2");
    }
}

app.use(bodyParser.json());
var obj1 = new Users({
    Usersname: "jaysinha.bestindwrld@gmail.com",
    password: "team45@890",
    accessToken: "",
    BTCBal: "",
    INRBal: ""
});

var obj2 = new Users({
    Usersname: "rahulthebest.sinha@gmail.com",
    password: "team45@890",
    accessToken: "",
    BTCBal: "",
    INRBal: ""
});

var obj3 = new Users({
    Usersname: "rahulthebest.form@gmail.com",
    password: "team45@890",
    accessToken: "",
    BTCBal: "",
    INRBal: ""
});

app.get("/initiate1", function(req,res){
   Users.register(new Users({Usersname: obj1.Usersname, BTCBal: obj1.BTCBal, INRBal:obj1.INRBal, accessToken: obj1.accessToken}), obj1.password ,function(err, Users){
       if (err) {
           console.log("Some error happened!");
       } else {
           console.log("Users info added!");
       }
   }) 
});

app.get("/initiate2", function(req,res){
   Users.register(new Users({Usersname: obj2.Usersname, BTCBal: obj2.BTCBal, INRBal:obj2.INRBal, accessToken: obj2.accessToken}), obj2.password ,function(err, Users){
       if (err) {
           console.log("Some error happened!");
       } else {
           console.log("Users info added!");
       }
   }) 
});

app.get("/initiate3", function(req,res){
   Users.register(new Users({Usersname: obj3.Usersname, BTCBal: obj3.BTCBal, INRBal:obj3.INRBal, accessToken: obj3.accessToken}), obj3.password ,function(err, Users){
       if (err) {
           console.log("Some error happened!");
       } else {
           console.log("Users info added!");
       }
   }) 
});

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/home",isLoggedIn ,function(req, res){
   res.render("index"); 
});

app.get("/login2", function(req, res){
   res.render("login", {message: req.flash("error")}); 
});

app.post("/login",passport.authenticate("local",
    {successRedirect: "/home",
     failureRedirect: "/"
    }),  function(req, res){
    
});

app.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is up and running!"); 
});