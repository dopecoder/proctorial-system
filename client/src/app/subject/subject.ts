interface InstructorReference {
  object_id : String;
}

export interface marksReference {
  student_id:String;
  internal1: Number;
  internal2: Number;
  internal3: Number;
}

export interface attendanceReference {
  student_id:String;
  quarter1: Number;
  quarter2: Number;
  quarter3: Number;
}

export interface portionReference {
  Feb: Number;
  March: Number;
  April: Number;
  May: Number;
}

export class Subject {
  _id : String;
  id : String;
  name : String;
  department : String;
  subject_code : String;
  semester : Number;
  section: String;
  instructors : InstructorReference[];
  internal_marks : marksReference[];//added
  attendance : attendanceReference[];//added
  portionCompletion : portionReference;//added

  constructor(name: String, id : String, department : String, semester : Number, section : String, subject_code : String){
      this.name = name;
      this.id = id;
      this.department = department;
      this.semester = semester;
      this.subject_code = subject_code;
      this.section = section;
      this.instructors = [];
      this.internal_marks = [];
      this.attendance = [];
  }
}
