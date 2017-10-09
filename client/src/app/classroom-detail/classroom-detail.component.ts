import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import * as XLSX from 'xlsx';

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

  @ViewChild('fileInput') fileInput;
  //@Input() internalSelected : Number;

  years = [2018, 2019, 2020, 2021, 2022, 2023];
  internals = [1, 2, 3];
  classroom: Classroom;
  students: Student[];
  subjects: Subject[];
  selectedInternal : Number;
  selectedAttendance : Number;
  attendanceData : Array<Array<any>>;
  internalData : Array<Array<any>>;

  quart = ['Q1', 'Q2', 'Q3', 'Q4'];

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

  uploadInternals(): void {
    console.log(this.fileInput);
    console.log(this.selectedInternal);
    var files = this.fileInput.nativeElement;
    if(files.files && files.files[0]){
      var thisFile = files.files[0];
      var fileName = thisFile.name;
      var extention = fileName.split('.');
      if(extention[1] != 'xlsx'){
        console.log("Invalid file");
      }
      console.log(fileName);
    }else{
      console.log("Else executed!");
    }
  }

  uploadAttendance(): void {
    console.log(this.fileInput);
    console.log(this.selectedAttendance);
    var files = this.fileInput.nativeElement;
    if(files.files && files.files[0]){
      var thisFile = files.files[0];
      var fileName = thisFile.name;
      var extention = fileName.split('.');
      if(extention[1] != 'xlsx'){
        console.log("Invalid file");
      }
      console.log(fileName);
    }else{
      console.log("Else executed!");
    }
  }

  onFileChangeInternals(evt: any) {
  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>(evt.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    /* read workbook */
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    this.internalData = (XLSX.utils.sheet_to_json(ws, {header: 1})) as Array<Array<any>>;
    console.log(this.internalData);
    if(this.internalData){
      var student : Student;
      /*for(var i=0; i<this.students.length; i++){
          var student_exist = student_exists(this.students[i].usn);
          if(student_exist){
            updateStudentInternal(student_exist, this.selectedInternal, this.students[i]);
          }
      }*/
    }
  };
  reader.readAsBinaryString(target.files[0]);
}

onFileChangeAttendance(evt: any) {
/* wire up file reader */
const target: DataTransfer = <DataTransfer>(evt.target);
if (target.files.length !== 1) throw new Error('Cannot use multiple files');
const reader: FileReader = new FileReader();
reader.onload = (e: any) => {
  /* read workbook */
  const bstr: string = e.target.result;
  const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

  /* grab first sheet */
  const wsname: string = wb.SheetNames[0];
  const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  /* save data */
  this.attendanceData = (XLSX.utils.sheet_to_json(ws, {header: 1})) as Array<Array<any>>;
  console.log(this.attendanceData);
  if(this.attendanceData){
    var student : Student;
    /*for(var i=0; i<this.students.length; i++){
        var student_exist = student_exists(this.students[i].usn);
        if(student_exist){
          updateStudentInternal(student_exist, this.selectedInternal, this.students[i]);
        }
    }*/
  }
};
reader.readAsBinaryString(target.files[0]);
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
