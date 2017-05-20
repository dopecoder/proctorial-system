var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var InstructorModel = "Instructor"

var InsructorSchema = new Schema({
  id : String,
  name : String,
  department : String,
  year_of_joining : Number
});

module.exports = mongoose.model(InstructorModel, InsructorSchema);
