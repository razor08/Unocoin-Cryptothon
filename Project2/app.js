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
mongoose.connect("mongodb://razor08:hailhydra<3@ds051655.mlab.com:51655/unocoin");
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
    secret: "I am the best in the world!",
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
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
    username: "jaysinha.bestindwrld@gmail.com",
    password: "team45@890",
    accessToken: "d407c38d28087b93513fbff2816a64a25b9bafa4",
    BTCBal: "",
    INRBal: ""
});

var obj2 = new Users({
    username: "rahulthebest.sinha@gmail.com",
    password: "team45@890",
    accessToken: "c6ce54622ea8b8ea9a024deb44d1fbdcb00bea29",
    BTCBal: "",
    INRBal: ""
});

var obj3 = new Users({
    username: "rahulthebest.form@gmail.com",
    password: "team45@890",
    accessToken: "b9b3f9674d5b1b0724ce7b8b10145eb103e86ff0",
    BTCBal: "",
    INRBal: ""
});

app.get("/initiate1", function(req,res){
   Users.register(new Users({username: obj1.username, BTCBal: obj1.BTCBal, INRBal:obj1.INRBal, accessToken: obj1.accessToken}), obj1.password ,function(err, user){
       if (err) {
           console.log("Some error happened!");
       } else {
           console.log("User info added!");
       }
   }) 
});

app.get("/initiate2", function(req,res){
   Users.register(new Users({username: obj2.username, BTCBal: obj2.BTCBal, INRBal:obj2.INRBal, accessToken: obj2.accessToken}), obj2.password ,function(err, user){
       if (err) {
           console.log("Some error happened!");
       } else {
           console.log("User info added!");
       }
   }) 
});

app.get("/initiate3", function(req,res){
   Users.register(new Users({username: obj3.username, BTCBal: obj3.BTCBal, INRBal:obj3.INRBal, accessToken: obj3.accessToken}), obj3.password ,function(err, user){
       if (err) {
           console.log("Some error happened!");
       } else {
           console.log("User info added!");
       }
   }) 
});

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/welcome",isLoggedIn,function(req, res){
   res.render("welcome",{currentUser: req.user}); 
});

app.get("/home",isLoggedIn ,function(req, res){
    console.log(req.user._id);
    Users.findById(req.user._id,function(err, foundUser){
       if (err) {
           console.log("Your request cannot be processed at the moment!");
       } else {
           console.log(foundUser);
           var rtrn = {
               username: foundUser.username,
               BTCBal: foundUser.BTCBal,
               INRBal: foundUser.INRBal,
               accessToken: foundUser.accessToken
           };
           res.render("index",{currentUser: req.user, foundUser:rtrn});
       }
    });
});

app.post("/updater",function(req, res){
   console.log(req.body);
   var id;
//   var newOne = {
//         username: req.body.email,
//         BTCBal: req.body.BTCBal,
//         INRBal: req.body.INRBal,
//     };
    Users.findOne({username: req.body.email},function(err, found){
        found.BTCBal = req.body.BTCBal;
        found.INRBal = req.body.INRBal;
        found.save(function(err, updated){
            console.log(updated);
        })
    });
    /*console.log("New Object is");
    console.log(newOne);*/
//   Users.findByIdAndUpdate(id, { $set: { BTCBal: req.body.BTCBal, INRBal: req.body.INRBal }}, function (err, tank) {
//     res.send(tank);
// });

});

app.get("/login2", function(req, res){
   res.render("login", {message: req.flash("error")}); 
});

app.post("/login",passport.authenticate("local",
    {successRedirect: "/welcome",
     failureRedirect: "/"
    }),  function(req, res){
    
});

app.post("/loginexec", function(req, res){
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

app.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is up and running!"); 
});