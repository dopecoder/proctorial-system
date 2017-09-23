import {Classroom} from '../classroom/classroom'

interface ClassroomReference {
  object_id : String;
}


export class Instructor {
  _id : String;
  id : String;
  name : String;
  section: String;
  semester: Number;
  department : String;
  year_of_joining : Number;

  constructor(name: String, id : String, department : String, year_of_joining : Number, semester : Number, section : String){
      this.name = name;
      this.id = id;
      this.section = section;
      this.semester = semester;
      this.department = department;
      this.year_of_joining = year_of_joining;
  }
}
