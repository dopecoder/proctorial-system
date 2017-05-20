import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { InstructorService } from '../instructor/instructor.service'
import { Instructor } from '../instructor/instructor'
import { SubjectService } from '../subject/subject.service'
import { Subject } from '../subject/subject'
import { StudentReference } from '../classroom/classroom'


@Component({
  selector: 'app-instructor-create',
  templateUrl: './instructor-create.component.html',
  styleUrls: ['./instructor-create.component.css'],
  providers: [InstructorService, SubjectService]
})

export class InstructorCreateComponent implements OnInit {
  instructor: Instructor;
  subject: Subject;
  classId : String;

  constructor(
    private subjectService: SubjectService,
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.instructor = new Instructor('', '', '', 0);

    this.route.params
    //.switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
    .subscribe(params => {
            console.log('param = ' + params['id']);
            this.classId = params['id'];
            this.getSubject(params['id']);
    });
  }


  save(): void {
    console.log(this.instructor);
    this.instructorService.create(this.instructor)
      .then((instructor:Instructor) => {
              console.log("Updating subject and created instructor");
              console.log(instructor);
              this.instructor = instructor;
              this.updateSubject();
              //this.goBack();
      });
  }

  updateSubject(): void{
    if(this.subject.instructors == null || this.subject.instructors == undefined){
      this.subject.instructors = new Array();
    }
    this.subject.instructors.push({object_id:this.instructor._id} as StudentReference);
    console.log("Subject =>");
    console.log(this.subject);
    this.subjectService.update(this.subject).then(()=> this.goBack());
  }

  getSubject(id: String): void {
    this.subjectService.getSubject(id).then((subject:Subject)=>{
      console.log("Subject => ");
      this.subject = subject;
    })
  }

  goBack(): void {
    this.location.back();
  }

}
