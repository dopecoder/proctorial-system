var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubjectModel = "Subject";

var SubjectSchema = new Schema({
  id : String,
  name : String,
  department : String,
  semester : Number,
  instructors : [{object_id:String}],
  internal_marks : [{
  student_id:String,
  internal1: Number,
  internal2: Number,
  internal3: Number
}],
  attendance : [{
  student_id:String,
  quarter1: Number,
  quarter2: Number,
  quarter3: Number
}],
  portionCompletion : {
  Feb: Number,
  March: Number,
  April: Number,
  May: Number
}
});

module.exports = mongoose.model(SubjectModel, SubjectSchema);
