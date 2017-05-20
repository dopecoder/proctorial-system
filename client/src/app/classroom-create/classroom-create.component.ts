import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Student, MarksList } from '../student/student'
import { Classroom ,StudentReference } from '../classroom/classroom'
import { StudentService } from '../student/student.service'
import { ClassroomService } from '../classroom/classroom.service'


@Component({
  selector: 'app-classroom-create',
  templateUrl: './classroom-create.component.html',
  styleUrls: ['./classroom-create.component.css'],
  providers: [StudentService, ClassroomService]
})

export class ClassroomCreateComponent implements OnInit {
  classroom: Classroom;

  constructor(
    private studentService: StudentService,
    private classrooomService: ClassroomService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.classroom = new Classroom('', '', '', '', 0);
    this.classroom.students = [];
  }

  save(): void {
    console.log(this.classroom);
    this.classrooomService.create(this.classroom)
      .then((classroom:Classroom) => {
              this.classroom = classroom;
              this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
