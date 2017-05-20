import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ClassroomService } from './classroom.service'; 
import { Classroom } from './classroom';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  providers: [ClassroomService],
  styleUrls: ['./classroom.component.css']
})

export class ClassroomComponent implements OnInit {

  classrooms: Classroom[];
  selectedClassroom : Classroom;


  constructor(
    private classroomService: ClassroomService,
    private router: Router) { }

  getClassrooms(): void {
    this.classroomService
        .getClassrooms()
        .then(classrooms => {
          console.log("Running getClassrooms()");
          console.log(classrooms);
          this.classrooms = classrooms;   
          console.log(this.classrooms[0]);   
        });
  }

  /*add(name: String, section : String, semester : String, year_of_passing : Number): void {
    let new_classroom = new Classroom(name.trim(), section, semester, year_of_passing);
    if (!name) { return; }
    this.classroomService.create(new_classroom)
      .then(classroom => {
        console.log(classroom);
        this.classrooms.push(classroom);
        this.selectedClassroom = null;
      });
  }*/

  delete(classroom: Classroom): void {
    this.classroomService
        .delete(classroom._id)
        .then(() => {
          this.classrooms = this.classrooms.filter(h => h !== classroom);
          if (this.selectedClassroom === classroom) { this.selectedClassroom = null; }
        });
  }

  ngOnInit(): void {
    this.getClassrooms();
  }

  onSelect(classroom: Classroom): void {
    this.selectedClassroom = classroom;
  }

  gotoDetail(classroom: Classroom): void {
    this.router.navigate(['/classroomdetail', classroom._id]);
  }

  createClassroom(): void{
    this.router.navigate(['/classroomcreate']);
  }
}