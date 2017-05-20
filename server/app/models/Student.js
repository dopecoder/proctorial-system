var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentModel = "Student"

var StudentSchema = new Schema({
    classroom_id: String,
    first_name : String,
    last_name : String,
    usn : String,
    email : String,
    date: { type: Date, default: Date.now },
    department : String,
 	  semester : Number,
  	section : String,
	  year_of_joining : Number,
    backlogs : {
        current : Number,
        dead : Number
    },
    marks : {
        elementary : Number,
        associate : Number,
        first : Number,
        second : Number,
        third : Number,
        fourth : Number,
        fifth : Number,
        sixth : Number,
        seventh : Number,
        eighth : Number
    }
});

//StudentSchema.methods.update_fields = function

module.exports = mongoose.model(StudentModel, StudentSchema);
