import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Student, Marks, MarksList, Backlogs } from './student'
import { StudentService } from './student.service'


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  providers: [StudentService],
  styleUrls: ['./student.component.css'],
})

export class StudentComponent implements OnInit {

  students: Student[];
  selectedStudent: Student;
  
  constructor(
    private studentService: StudentService,
    private router: Router) { }

  getStudents(): void {
    this.studentService
        .getStudents()
        .then(students => {  
          console.log("Running getStudents()");
          console.log(students);
          this.students = students;
          console.log(this.students[0].marks.elementary[0]); 
      });
  }

  add(firstName : String, lastName : String, usn : String, email : String, 
      department : String, semester : Number, yearOfPassing : Number,
      section : String, backlogs : Backlogs, marks : MarksList): void {
    let student = new Student(firstName, lastName, usn, email, department, semester, yearOfPassing, section, backlogs, marks);
    if (!name) { return; }
    this.studentService.create(student)
      .then(student => {
        console.log(student);
        this.students.push(student);
        this.selectedStudent = null;
      });
  }

  delete(student: Student): void {
    this.studentService
        .delete(student._id)
        .then(() => {
          this.students = this.students.filter(h => h !== student);
          if (this.selectedStudent === student) { this.selectedStudent = null; }
        });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;
  }

  goToDetail(student: Student): void {
    this.router.navigate(['/studentdetail', student._id]);
  }
}