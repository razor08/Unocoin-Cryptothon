var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = mongoose.Schema({
   username: String,
   password: String,
   accessToken: String,
   BTCBal: String,
   INRBal: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);