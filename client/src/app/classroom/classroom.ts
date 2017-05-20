
export interface StudentReference {
  object_id : String;
}

export interface SubjectReference {
  object_id : String;
}


export class Classroom {
  _id : String;
  name : String;
  section : String;
  semester : Number;
  department : String;
  year_of_passing : Number;
  students : StudentReference[];
  subjects : SubjectReference[];

  constructor(name: String, section : String, semester : Number, department : String, year_of_passing : Number){
      this.name = name;
      this.section = section;
      this.semester = semester;
      this.department = department;
      this.year_of_passing = year_of_passing;
  }

  addStudent(studentReference : StudentReference) : void{
      //call the student service to get the work done.
  }
}
