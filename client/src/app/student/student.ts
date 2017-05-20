export interface Marks {
  subject : String;
  obtained : Number;
}

export interface MarksList {
  elementary : Number;
  associate : Number;
  first : Number;
  second : Number;
  third : Number;
  fourth : Number;
  fifth : Number;
  sixth : Number;
  seventh : Number;
  eighth : Number;
}

export interface Backlogs {
  current : Number;
  dead : Number;
}

export class Student{

  _id : String;
  classroom_id : String; //added
  first_name : String;
  last_name : String;
  usn : String;
  email : String;
  department : String;
  semester : Number;
  year_of_joining : Number;
  section : String;
  backlogs : Backlogs;
  marks : MarksList;

  constructor(firstName : String, lastName : String, usn : String, email : String,
              department : String, semester : Number, yearOfJoining : Number,
              section : String, backlogs : Backlogs, marks : MarksList){

                this.first_name = firstName;
                this.last_name = lastName;
                this.usn = usn;
                this.email = email;
                this.department = department;
                this.semester = semester;
                this.year_of_joining = yearOfJoining;
                this.section = section;
                this.backlogs = backlogs;
                this.marks = marks;
              }
}
