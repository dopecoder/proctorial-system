import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Classroom } from '../classroom/classroom'
import { Student } from '../student/student'
import { Subject } from '../subject/subject'
import { ClassroomService } from '../classroom/classroom.service'
import { StudentService } from '../student/student.service'
import { SubjectService } from '../subject/subject.service'

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css'],
  providers: [ClassroomService, StudentService, SubjectService]
})

export class ClassroomDetailComponent implements OnInit {
  years = [2018, 2019, 2020, 2021, 2022, 2023]
  classroom: Classroom;
  students: Student[];
  subjects: Subject[];

  constructor(
    private classroomService: ClassroomService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    //console.log(params[id]);
    /*this.route.params
    .switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
    .subscribe(classroom => {
          console.log('yaay!');
          console.log(classroom);
          this.classroom = classroom as Classroom
      });*/

  this.route.params
    //.switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
    .subscribe(params => {
          console.log('param = ' + params['id']);
          this.getClassroom(params['id']);
          //console.log(classroom);
          //this.classroom = classroom as Classroom
      });
  }

  getClassroom(id: String): void {
    this.classroomService
        .getClassroom(id)
        .then(classroom => {
          console.log("Running getClassroom()");
          //console.log(classroom);
          this.classroom = classroom;
          //console.log(this.classroom);
          if(this.classroom.students != []){
            console.log(this.classroom.students);
            this.students = new Array();
            for(var i=0; i<this.classroom.students.length; i++){
              console.log('getting student ' + this.classroom.students[i].object_id);
              this.getStudent(this.classroom.students[i].object_id);
            }
          }

          console.log("SUBJECTS 1 :")
          console.log(this.classroom);

          if(this.classroom.subjects != []){
            console.log("SUBJECTS 2 : ")
            console.log(this.classroom.subjects);
            this.subjects = new Array();
            for(var i=0; i<this.classroom.subjects.length; i++){
              console.log('getting student ' + this.classroom.subjects[i].object_id);
              this.getSubject(this.classroom.subjects[i].object_id);
            }
          }
        });
  }

  getSubject(id: String) : void {
    this.subjectService.getSubject(id).then((subject:Subject) => {
      //console.log("OBJ : " + student);
      //console.log(student);
      console.log('got ' + subject.name);
      this.subjects.push(subject);
    })
  }

  getStudent(id: String) : void {
    this.studentService.getStudent(id).then((student:Student) => {
      //console.log("OBJ : " + student);
      //console.log(student);
      console.log('got ' + student.first_name + ' ' + student.last_name);
      this.students.push(student);
    })
  }

  createStudent(): void {
    this.router.navigate(['/studentcreate', this.classroom._id]);
  }

  createSubject(): void {
    this.router.navigate(['/subjectcreate', this.classroom._id]);
  }

  save(): void {
    this.classroomService.update(this.classroom)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  goToDetail(student: Student): void {
    this.router.navigate(['/studentdetail', student._id]);
  }

  goToSubjectDetail(subject: Subject): void {
    this.router.navigate(['/subjectdetail', subject._id]);
  }

}
