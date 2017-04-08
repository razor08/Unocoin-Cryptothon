var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
   username: String,
   password: String,
   accessToken: String,
   BTCBal: String,
   INRBal: String
});

module.exports = mongoose.model("User",userSchema);