import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Location } from '@angular/common';
import { Instructor } from './instructor'
import { InstructorService } from './instructor.service'
import { Subject } from '../subject/subject'
import { SubjectService } from '../subject/subject.service'

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
  providers: [InstructorService, SubjectService]
})

export class InstructorComponent implements OnInit {

  instructors: Instructor[];
  selectedInstructor: Instructor;
  subject: Subject;
  selectState: boolean = false;
  listState: boolean = false;

  constructor(
    public af: AngularFire,
    private instructorService: InstructorService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

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
    this.route.params
      //.switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
      .subscribe(params => {
        console.log('param = ' + params['id']);
        var subject_id = params['id'];
        if (subject_id) {
          this.getSubject(subject_id);
          setTimeout(() => {
            if (this.subject) {
              // add subject to selected instructor
              this.selectState = true;
              console.log("select  : " + this.selectState);
              console.log("list : " + this.listState);
            }
          }, 1000);
        } else {
          this.listState = true;
          console.log("select  : " + this.selectState);
          console.log("list : " + this.listState);
        }
      });

    this.getInstructors();
  }

  selectInstructor(instructor: Instructor) {
    //add the current subject to the instructor passed
    if (this.subject) {
      instructor.subjects.push(this.subject._id.valueOf());
      console.log(instructor)

      
        this.instructorService.update(instructor).then(() => {
          console.log("Successfully updated instructor");
          this.subject.instructors.push({ object_id: instructor._id });
          this.subjectService.update(this.subject).then(() => {
            console.log("Successfully updated subject");
            this.goBack();
          }).catch((e) => {
            console.log(e);
          });
        }).catch((e) => {
          console.log(e);
          this.goBack();
        })
    }
  }

  getSubject(id: String): void {
    this.subjectService.getSubject(id).then((subject: Subject) => {
      console.log("Subject => ");
      this.subject = subject as Subject;
    })
  }

  onSelect(instructor: Instructor): void {
    this.selectedInstructor = instructor;
    // Add the subject id to the instructor and update the subject's instructor id
  }

  gotoDetail(instructor: Instructor): void {
    this.router.navigate(['/instructordetail', instructor._id]);
  }

  createInstructor(): void {
    this.router.navigate(['/instructorcreate']);
  }

  goBack(): void {
    this.location.back();
  }

}
