import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Subject } from './subject'
import { SubjectService } from './subject.service'

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  providers: [SubjectService]
})

export class SubjectComponent implements OnInit {

  subjects: Subject[];
  selectedSubject: Subject;

  constructor(
    private instructorService: SubjectService,
    private router: Router) { }

  getInstructors(): void {
    this.instructorService
        .getSubjects()
        .then(subjects => {
          console.log("Running getClassrooms()");
          console.log(subjects);
          this.subjects = subjects;
          console.log(subjects[0]);
        });
  }

  delete(subject: Subject): void {
    this.instructorService
        .delete(subject._id)
        .then(() => {
          this.subjects = this.subjects.filter(h => h !== subject);
          if (this.selectedSubject === subject) { this.selectedSubject = null; }
        });
  }

  ngOnInit(): void {
    this.getInstructors();
  }

  onSelect(subject: Subject): void {
    this.selectedSubject = subject;
  }

  gotoDetail(subject: Subject): void {
    this.router.navigate(['/subjectdetail', subject._id]);
  }

  createSubject(): void{
    this.router.navigate(['/subjectcreate']);
  }


}
