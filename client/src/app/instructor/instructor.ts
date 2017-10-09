import {Classroom} from '../classroom/classroom'
import { Subject } from '../subject/subject'

interface ClassroomReference {
  object_id : String;
}


export class Instructor {
  _id : String;
  id : String;
  name : String;
  semester: Number;
  department : String;
  year_of_joining : Number;
  subjects : String[];
  my_classrooms : String[];

  constructor(name: String, id : String, department : String, year_of_joining : Number, semester : Number){
      this.name = name;
      this.id = id;
      this.department = department;
      this.year_of_joining = year_of_joining;
  }

  addClassroom(id: String) : void {
    if(!this.my_classrooms){
      this.my_classrooms = [id];
    }else{
      this.my_classrooms.push(id);
    }
  }
}
