import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Classroom } from '../classroom/classroom'
import { Student } from '../student/student'
import { Instructor } from '../instructor/instructor'
import { ClassroomService } from '../classroom/classroom.service'
import { StudentService } from '../student/student.service'
import { InstructorService } from '../instructor/instructor.service'

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css'],
  providers: [ClassroomService, StudentService, InstructorService]
})

export class InstructorDetailComponent implements OnInit {
  instructor: Instructor;

  constructor(
    private classroomService: ClassroomService,
    private instructorService: InstructorService,
    private studentService: StudentService,
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
          this.getInstructor(params['id']);
          //console.log(classroom);
          //this.classroom = classroom as Classroom
      });
  }

  getInstructor(id: String): void {

    this.instructorService.getInstructors().then((instructors:Instructor[]) => {
      //console.log("OBJ : " + student);
      //console.log(student);
      for(var i=0; i<instructors.length; i++){
        if(instructors[i]._id == id){
          this.instructor = instructors[i];
        }
      }
      console.log(this.instructor);
    })

  }

  /*
  getStudent(id: String) : void {
    this.studentService.getStudent(id).then((student:Student) => {
      //console.log("OBJ : " + student);
      //console.log(student);
      console.log('got ' + student.first_name + ' ' + student.last_name);
      this.students.push(student);
    })
  }*/


  save(): void {
    this.instructorService.update(this.instructor)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  goToDetail(instructor: Instructor): void {
    this.router.navigate(['/instructordetail', instructor._id]);
  }

}
