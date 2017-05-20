import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Instructor } from './instructor'
import { InstructorService } from './instructor.service'

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
  providers: [InstructorService]
})

export class InstructorComponent implements OnInit {

  instructors: Instructor[];
  selectedInstructor: Instructor;

  constructor(
    private instructorService: InstructorService,
    private router: Router) { }

  getInstructors(): void {
    this.instructorService
        .getInstructors()
        .then(insructors => {
          console.log("Running getClassrooms()");
          console.log(insructors);
          this.instructors = insructors;
          console.log(insructors[0]);
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

  delete(instructor: Instructor): void {
    this.instructorService
        .delete(instructor._id)
        .then(() => {
          this.instructors = this.instructors.filter(h => h !== instructor);
          if (this.selectedInstructor === instructor) { this.selectedInstructor = null; }
        });
  }

  ngOnInit(): void {
    this.getInstructors();
  }

  onSelect(instructor: Instructor): void {
    this.selectedInstructor = instructor;
  }

  gotoDetail(instructor: Instructor): void {
    this.router.navigate(['/classroomdetail', instructor._id]);
  }

  createInstructor(): void{
    this.router.navigate(['/instructorcreate']);
  }


}
