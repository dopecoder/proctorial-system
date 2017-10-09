import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Classroom } from '../classroom/classroom'
import { Student, Marks, MarksList, Backlogs } from '../student/student'
import { StudentService } from '../student/student.service'
import { ClassroomService } from '../classroom/classroom.service'
import { SubjectService } from '../subject/subject.service'


@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  providers: [StudentService, ClassroomService, SubjectService],
  styleUrls: ['./student-filter.component.css'],
})



export class StudentFilterComponent implements OnInit {

  students: Student[];
  selectedStudent: Student;
  filteredList: Student[];
  filter : any;

  classrooms: Classroom[];

  semesters: Number[];
  options = [">", "<", "=", ">=", "<="];

  constructor(
    private studentService: StudentService,
    private classroomService: ClassroomService,
    private subjectService : SubjectService,
    private router: Router) {  }

  getStudents(): void {
    this.studentService
        .getStudents()
        .then(students => {
          console.log("Running getStudents()");
          console.log(students);
          this.students = students;
          console.log(this.students[0].marks.elementary);
      });
  }

  add(firstName : String, lastName : String, usn : String, email : String,
      department : String, semester : Number, yearOfPassing : Number,
      section : String, backlogs : Backlogs, marks : MarksList): void {
    let student = new Student(firstName, lastName, usn, email, department, semester, yearOfPassing, section, backlogs, marks);
    if (!name) { return; }
    this.studentService.create(student)
      .then(student => {
        console.log(student);
        this.students.push(student);
        this.selectedStudent = null;
      });
  }

  delete(student: Student): void {
    this.studentService
        .delete(student._id)
        .then(() => {
          this.students = this.students.filter(h => h !== student);
          if (this.selectedStudent === student) { this.selectedStudent = null; }
        });
  }

  ngOnInit(): void {
    this.semesters = new Array();
    this.filteredList = new Array();
    this.getSemesters();
    this.getStudents();
    this.filter = this.getNewFilter()
  }

  getNewFilter() : any{
    return new Object({
      semester : 0,
      aggregate : 0,
      aggregate_type : '',
      int1 : 0,
      int1_type : '',
      int2 : 0,
      int2_type : '',
      int3 : 0,
      int3_type : '',
      attendance : 0,
      attendance_type : '',
    });
  }

  checkObject(): any{
    return  new Object({
      semester : 0,
      int1: 0,
      int2: 0,
      int3: 0,
      aggregate: 0,
      attendance: 0
    });
  }


  search(): void {
    //this.filter will contain info

    console.log("Submitted : ");
    console.log(this.filter);

    this.filteredList = [];
    this.students.forEach((student, idx)=>{
      var thisStudent = this.checkObject();
      if(this.filter.semester){
        if(student.semester != this.filter.semester){
          thisStudent.semester = -1;
        }else{
          thisStudent.semester = 1;
        }
      }else{
        thisStudent.semester = 0;
      }

      if(this.filter.aggregate){
        if(this.filter.aggregate_type == ">"){
          if(this.getAgg(student) > this.filter.aggregate){
            thisStudent.aggregate = 1;
          }else{
            thisStudent.aggregate = -1;
          }
        }else if(this.filter.aggregate_type == "<"){
          if(this.getAgg(student) > this.filter.aggregate){
            thisStudent.aggregate = 1;
          }else{
            thisStudent.aggregate = -1;
          }
        }else if(this.filter.aggregate_type == "="){
          if(this.getAgg(student) > this.filter.aggregate){
            thisStudent.aggregate = 1;
          }else{
            thisStudent.aggregate = -1;
          }
        }
      }else{
        thisStudent.aggregate = 0;
      }


      if(this.filter.int1){
        if(this.filter.int1_type == ">"){
          this.getHighestInt1(student).then((val)=>{
            if( val > this.filter.int1){
              thisStudent.int1 = 1;
            }else{
              thisStudent.int1 = -1;
            }
          });
        }else if(this.filter.int1_type == "<"){
          this.getLowestInt1(student).then((val)=>{
            if( val < this.filter.int1){
              thisStudent.int1 = 1;
            }else{
              thisStudent.int1 = -1;
            }
          });
        }else if(this.filter.int1_type == "="){
          this.getEqualInt1(student, this.filter.int1).then((val)=>{
            if(val){
              thisStudent.int1 = 1;
            }else{
              thisStudent.int1 = -1;
            }
          });
        }
      }else{
        thisStudent.int1 = 0;
      }


      if(this.filter.int2){
        if(this.filter.int2_type == ">"){
          this.getHighestInt2(student).then((val)=>{
            if( val > this.filter.int2){
              thisStudent.int2 = 1;
            }else{
              thisStudent.int2 = -1;
            }
          });
        }else if(this.filter.int2_type == "<"){
          this.getLowestInt2(student).then((val)=>{
            if( val < this.filter.int2){
              thisStudent.int2 = 1;
            }else{
              thisStudent.int2 = -1;
            }
          });
        }else if(this.filter.int2_type == "="){
          this.getEqualInt2(student, this.filter.int2).then((val)=>{
            if(val){
              thisStudent.int2 = 1;
            }else{
              thisStudent.int2 = -1;
            }
          });
        }
      }else{
        thisStudent.int2 = 0;
      }



      if(this.filter.int3){
        if(this.filter.int3_type == ">"){
          this.getHighestInt3(student).then((val)=>{
            if( val > this.filter.int1){
              thisStudent.int3 = 1;
            }else{
              thisStudent.int3 = -1;
            }
          });
        }else if(this.filter.int3_type == "<"){
          this.getLowestInt3(student).then((val)=>{
            if( val < this.filter.int3){
              thisStudent.int3 = 1;
            }else{
              thisStudent.int3 = -1;
            }
          });
        }else if(this.filter.int3_type == "="){
          this.getEqualInt3(student, this.filter.int3).then((val)=>{
            if(val){
              thisStudent.int3 = 1;
            }else{
              thisStudent.int3 = -1;
            }
          });
        }
      }else{
        thisStudent.int3 = 0;
      }


      if(this.filter.attendance){
        if(this.filter.attendance_type == ">"){
          if(this.getHighestAttendance(student) > this.filter.attendance){
            thisStudent.attendance = 1;
          }else{
            thisStudent.attendance = -1;
          }
        }else if(this.filter.attendance_type == "<"){
          if(this.getLowestAttendance(student) < this.filter.attendance){
            thisStudent.attendance = 1;
          }else{
            thisStudent.attendance = -1;
          }
        }else if(this.filter.attendance_type == "="){
          if(this.getEqualAttendance(student, this.filter.attendance)){
            thisStudent.attendance = 1;
          }else{
            thisStudent.attendance = -1;
          }
        }
      }else{
        thisStudent.attendance = 0;
      }

      setTimeout(()=>{if(this.valid(thisStudent)){
        this.filteredList.push(student);
      }}, 500);
    })
  }

  getAgg(student: Student) {
    var labelsAndSeries = this.studentService.getLabelsAndSeries(student);
    var analysisAndAggr = this.studentService.getOverallPerformance(labelsAndSeries);
    return analysisAndAggr.aggr;
  }

  getInternals(student: Student): Promise<any>{
    var int1 = [];
    var int2 = [];
    var int3 = [];
    return new Promise((resolve, reject)=>{
      this.classroomService.getClassroom(student.classroom_id).then((classroom)=>{
          this.subjectService.getSubjects().then((subjects)=>{
            for(var k=0; k<classroom.subjects.length; k++){
              for(var i=0; i<subjects.length; i++){
                if(subjects[i]._id == classroom.subjects[k].object_id){
                  for(var j=0; j<subjects[i].internal_marks.length; j++){
                    if(subjects[i].internal_marks[j].student_id == student._id){
                      int1.push(subjects[i].internal_marks[j].internal1);
                      int2.push(subjects[i].internal_marks[j].internal2);
                      int3.push(subjects[i].internal_marks[j].internal3);
                    }
                  }
                }
              }
          }
          console.log({
          int1: int1,
          int2: int2,
          int3: int3
          });
          resolve(new Object({
          int1: int1,
          int2: int2,
          int3: int3
        }));
        })
      })
    });

  }


  getHighestInt1(student: Student) {
    return new Promise((resolve, reject)=>{
      this.getInternals(student).then((internals)=>{
        console.log(internals);
        var highest = internals.int1[0];
        for(var i=0; i<internals.int1.length; i++){
          if(internals.int1[i] > highest){
            highest = internals.int1[i];
          }
        }
        console.log("Highest int1 : ");
        console.log(highest);
        resolve(highest);
      })
    });

  }

  getLowestInt1(student: Student) {
    //var internals = this.getInternals(student);
    return new Promise((resolve, reject)=>{
    this.getInternals(student).then((internals)=>{
    var lowest = internals.int1[0];
    for(var i=0; i<internals.int1.length; i++){
      if(internals.int1[i] < lowest && internals.int1[i] != 0){
        lowest = internals.int1[i];
      }
    }
    resolve(lowest);
    });
  });
  }

  getEqualInt1(student: Student, num: Number) {
    //var internals = this.getInternals(student);
    return new Promise((resolve, reject)=>{
    this.getInternals(student).then((internals)=>{
    var lowest = internals.int1[0];
    for(var i=0; i<internals.int1.length; i++){
      if(internals.int1[i] == num){
        resolve(true);
      }
    }
    resolve(false);
  })
});
}


getHighestInt2(student: Student) {
  return new Promise((resolve, reject)=>{
    this.getInternals(student).then((internals)=>{
      console.log(internals);
      var highest = internals.int2[0];
      for(var i=0; i<internals.int2.length; i++){
        if(internals.int2[i] > highest){
          highest = internals.int2[i];
        }
      }
      console.log("Highest int1 : ");
      console.log(highest);
      resolve(highest);
    })
  });

}

getLowestInt2(student: Student) {
  //var internals = this.getInternals(student);
  return new Promise((resolve, reject)=>{
  this.getInternals(student).then((internals)=>{
  var lowest = internals.int2[0];
  for(var i=0; i<internals.int2.length; i++){
    if(internals.int2[i] < lowest && internals.int2[i] != 0){
      lowest = internals.int1[i];
    }
  }
  resolve(lowest);
  });
});
}

getEqualInt2(student: Student, num: Number) {
  //var internals = this.getInternals(student);
  return new Promise((resolve, reject)=>{
  this.getInternals(student).then((internals)=>{
  var lowest = internals.int2[0];
  for(var i=0; i<internals.int2.length; i++){
    if(internals.int2[i] == num){
      resolve(true);
    }
  }
  resolve(false);
})
});
}

getHighestInt3(student: Student) {
  return new Promise((resolve, reject)=>{
    this.getInternals(student).then((internals)=>{
      console.log(internals);
      var highest = internals.int3[0];
      for(var i=0; i<internals.int3.length; i++){
        if(internals.int3[i] > highest){
          highest = internals.int3[i];
        }
      }
      console.log("Highest int1 : ");
      console.log(highest);
      resolve(highest);
    })
  });

}

getLowestInt3(student: Student) {
  //var internals = this.getInternals(student);
  return new Promise((resolve, reject)=>{
  this.getInternals(student).then((internals)=>{
  var lowest = internals.int1[0];
  for(var i=0; i<internals.int3.length; i++){
    if(internals.int3[i] < lowest && internals.int3[i] != 0){
      lowest = internals.int3[i];
    }
  }
  resolve(lowest);
  });
});
}

getEqualInt3(student: Student, num: Number) {
  //var internals = this.getInternals(student);
  return new Promise((resolve, reject)=>{
  this.getInternals(student).then((internals)=>{
  var lowest = internals.int3[0];
  for(var i=0; i<internals.int3.length; i++){
    if(internals.int3[i] == num){
      resolve(true);
    }
  }
  resolve(false);
})
});
}

  getAtten(student: Student) : any{
    var attendance = [];
    this.classroomService.getClassroom(student.classroom_id).then((classroom)=>{
        this.subjectService.getSubjects().then((subjects)=>{
          for(var k=0; k<classroom.subjects.length; k++){
            for(var i=0; i<subjects.length; i++){
              if(subjects[i]._id == classroom.subjects[k].object_id){
                for(var j=0; j<subjects[i].attendance.length; j++){
                  if(subjects[i].attendance[j].student_id == student._id){
                    attendance.push(subjects[i].attendance[j].quarter1);
                    attendance.push(subjects[i].attendance[j].quarter2);
                    attendance.push(subjects[i].attendance[j].quarter3);
                  }
                }
              }
            }
        } //
        return attendance;
      })
    })
  }

  getHighestAttendance(student: Student) {
    var atten = this.getAtten(student);
    var highest = atten[0];
    for(var i=0; i<atten.length; i++){
      if(atten[i] > highest){
        highest = atten[i];
      }
    }
    return highest;
  }

  getLowestAttendance(student: Student) {
    var atten = this.getAtten(student);
    var lowest = atten[0];
    for(var i=0; i<atten.length; i++){
      if(atten[i] < lowest && atten[i] != 0){
        lowest = atten[i];
      }
    }
    return lowest;
  }

  getEqualAttendance(student: Student, num: Number) {
    var atten = this.getAtten(student);
    var lowest = atten[0];
    for(var i=0; i<atten.length; i++){
      if(atten[i] == num){
        return true;
      }
    }
    return false;
  }

  valid(checkObject: any){
    console.log("validating object : ");
    console.log(checkObject);
    if(checkObject.semester == -1 || checkObject.int1 == -1 || checkObject.int2 == -1 || checkObject.int3 == -1 || checkObject.aggregate == -1 || checkObject.attendance == -1){
      return false;
    }else{
      return true;
    }
  }



  onSelect(student: Student): void {
    this.selectedStudent = student;
  }

  getSemesters(): void {
    console.log("Running getSemesters()")
    this.classroomService.getClassrooms().then((classrooms)=>{
      console.log("Got response!");
      this.classrooms = classrooms;
      console.log(this.classrooms);
      console.log(this.classrooms.length);
        console.log(this.semesters.length);
      for(var i=0; i<this.classrooms.length; i++){
        console.log("RUNNING!")
        if(this.not_in(this.classrooms[i].semester.valueOf())){
          console.log("PUSHING!")
          this.semesters.push(this.classrooms[i].semester.valueOf());
        }
      }
      console.log("semesters : ");
      console.log(this.semesters);
      /*this.classrooms.forEach((classroom, idx)=>{
        if(!this.not_in(classroom.semester)){
          this.semesters.push(classroom.semester);
        }
      })*/
    })

  }

  not_in(num: Number): boolean {
    console.log(this.semesters.length);
    if(this.semesters.length > 0){
      for(var i=0; i<this.semesters.length; i++){
        if(this.semesters[i] == num){
          return false;
        }
      }
      return true;
    }else{
      return true;
    }
  }

  goToDetail(student: Student): void {
    this.router.navigate(['/studentdetail', student._id]);
  }
}
