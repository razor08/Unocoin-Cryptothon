var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var usersSchema = mongoose.Schema({
   username: String,
   password: String,
   accessToken: String,
   BTCBal: String,
   INRBal: String
});
usersSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Users",usersSchema);