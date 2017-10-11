import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Student, MarksList } from '../student/student'
import { Classroom ,StudentReference } from '../classroom/classroom'
import { SubjectService } from '../subject/subject.service'
import { Subject } from '../subject/subject'
import { StudentService } from '../student/student.service'
import { ClassroomService } from '../classroom/classroom.service'
import { portionReference } from '../subject/subject'


@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css'],
  providers: [SubjectService, StudentService, ClassroomService]
})

export class SubjectCreateComponent implements OnInit {
  departments = ["Computer science", "Other department"]
  subject: Subject;
  classroom: Classroom;
  classId: String;
  //portionCompletion: portionReference;

  constructor(
    private studentService: StudentService,
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.subject = new Subject('', '', '', null, '', '');
    //this.subject.portionCompletion = {Feb:0, March:0, April:0, May:0} as portionReference;
    //this.portionCompletion = this.subject.portionCompletion;
    this.route.params
    //.switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
    .subscribe(params => {
          console.log('param = ' + params['id']);
          this.classId = params['id'];
          this.getClassroom();
      });
  }

  save(): void {
    console.log(this.subject);
    this.subject.portionCompletion = {Feb:0, March:0, April:0, May:0} as portionReference;
    this.subjectService.create(this.subject)
      .then((subject:Subject) => {
              console.log("Actual Subject => ")
              console.log(subject);
              this.subject = subject;
              this.updateClassroom();
              this.goBack();
      });
  }
  getClassroom(): void{
    this.classroomService.getClassroom(this.classId)
      .then((classroom: Classroom) => {
        console.log("Classroom -->");
        console.log(classroom);
        this.classroom = classroom;})
  }

  updateClassroom(): void{
    //console.log(this.classroom);
    if (this.classroom.subjects == null || this.classroom.subjects == undefined)
      this.classroom.subjects = new Array();
    console.log("Subject =>");
    console.log(this.subject);
    this.classroom.subjects.push({object_id:this.subject._id, subject_code:this.subject.subject_code});
    console.log("Classroom =>");
    console.log(this.classroom);
    this.classroomService.update(this.classroom).then(()=> this.goBack());

  }

  goBack(): void {
    this.location.back();
  }

}
