var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserModel = "User";

var access_privilage_level = {
    full : "full",
    view : "view",
    modify : "modify",
    execute : "execute" 
}

var UserSchema = new Schema({
    name : String,
    email : String,
    password : String,
    access_level : String
});

module.exports = mongoose.model(UserModel, UserSchema);