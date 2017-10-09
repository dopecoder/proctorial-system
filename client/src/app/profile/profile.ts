

export interface Profile {
  first_name : String;
  last_name : String;
  email  :String;
  phone_no : String;
  gender : String;
  acc_type : String;
  classroom_ref : String;
  student_ref : String;
  instructor_ref? : String;
  classrooms_ref? : [String];
}
