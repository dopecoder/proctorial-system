var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClassroomModel = "ClassRoom"

var ClassroomSchema = new Schema({
    name : String,
    section : String,
    semester : String,
    department : String,
    year_of_passing : Number,
    students : [{object_id:String, usn:String}],
    subjects : [{object_id:String}]
});

module.exports = mongoose.model(ClassroomModel, ClassroomSchema);
