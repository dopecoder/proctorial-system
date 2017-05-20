import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Student, MarksList } from '../student/student'
import { Classroom ,StudentReference } from '../classroom/classroom'
import { attendanceReference , marksReference } from '../subject/subject'
import { StudentService } from '../student/student.service'
import { ClassroomService } from '../classroom/classroom.service'
import { Subject } from '../subject/subject'
import { SubjectService } from '../subject/subject.service'
import { SubjectReference } from '../classroom/classroom'


@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
  providers: [StudentService, ClassroomService, SubjectService]
})

export class StudentCreateComponent implements OnInit {
  student: Student;
  classrooom : Classroom;
  classId: String;
  subjects: Subject[];
  subjectList: SubjectReference[];

  constructor(
    private studentService: StudentService,
    private classrooomService: ClassroomService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {

    let backlogs = { current : 0, dead : 0 };
    let marks = {
      elementary:0,
      associate:0,
      first:0,
      second:0,
      third:0,
      fourth:0,
      fifth:0,
      sixth:0,
      seventh:0,
      eighth:0
    };
    this.student = new Student('', '', '', '', '', 0, 0, '', backlogs, marks);
    this.route.params
    //.switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
    .subscribe(params => {
          console.log('param = ' + params['id']);
          this.classId = params['id'];
          this.getClassroom();
          //console.log(classroom);
          //this.classroom = classroom as Classroom
      });
      this.subjects = [];
      this.subjectList = [];
  }

  save(): void {
    console.log("SAVE : " + this.student);
    this.student.semester = +this.classrooom.semester;  //adding + prefix  turns the string into number :))
    this.student.department = this.classrooom.department;
    this.student.section = this.classrooom.section;
    this.student.classroom_id = this.classrooom._id;
    this.studentService.create(this.student)
      .then((student:Student) => {
              this.student = student;
              this.updateClassroom();
              this.getSubjects(student);
      });
  }

  getClassroom(): void{
    this.classrooomService.getClassroom(this.classId)
      .then((classroom: Classroom) => {
        console.log("Classroom -->");
        console.log(classroom);
        this.classrooom = classroom;})
  }

  updateClassroom(): void{
    this.classrooom.students.push({object_id:this.student._id} as StudentReference);
    this.classrooomService.update(this.classrooom);//.then(()=> this.goBack());

  }

  initializeSubjects(student: Student): void{
    console.log("this.subjects");
    console.log(this.subjects);
    console.log(student._id);
    console.log(this.subjects.length);
    for(var subject of this.subjects){
      console.log(subject);
    }
    for(var i = 0; i<this.subjects.length; i++){
      console.log("Pushing.");
      this.subjects[i].internal_marks.push({student_id:student._id, internal1:0, internal2:0, internal3:0} as marksReference);
      this.subjects[i].attendance.push({student_id:student._id, quarter1:0, quarter2:0, quarter3:0} as attendanceReference);
      this.subjectService.update(this.subjects[i]);
    }
    console.log("new subjects");
    console.log(this.subjects);
  }

  getSubjects(student: Student): void {
    console.log("classroom_id");
    console.log(this.student);
    console.log(this.student.classroom_id);
    this.classrooomService.getClassroom(this.student.classroom_id).then((classroom: Classroom) => {
      console.log(classroom.subjects);
      this.subjectList = classroom.subjects as SubjectReference[];
      for(var subject of this.subjectList){
        this.subjectService.getSubject(subject.object_id).then((subject: Subject) => {
          this.subjects.push(subject as Subject);
        });
      }
      console.log("Initializing subjects.")
     //this.initializeSubjects(student);
    });
  }

/*
  getStudent(id: String): void {
    this.studentService
        .getStudent(id)
        .then(student => {
          console.log("Running getClassroom()");
          console.log(student);
          this.student = student;
          console.log(this.student);
          //this.getSubjects();
        });
  }*/

  goBack(): void {
    this.location.back();
  }

}
