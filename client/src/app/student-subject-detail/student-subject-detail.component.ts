import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Subject, marksReference, attendanceReference } from '../subject/subject'
import { Instructor } from '../instructor/instructor'
import { SubjectService } from '../subject/subject.service'
import { InstructorService } from '../instructor/instructor.service'
import { StudentService } from '../student/student.service'

import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../chartist.component';

declare var require: any;

interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  description: String;
  analysis: String;
}


interface data {
  labels:[String],
  series:[[Number]]
}


@Component({
  selector: 'app-student-subject-detail',
  templateUrl: './student-subject-detail.component.html',
  styleUrls: ['./student-subject-detail.component.css'],
  providers: [SubjectService, InstructorService, StudentService]
})

export class StudentSubjectDetailComponent implements OnInit {
  departments = ["Computer science", "Other department"];
  subject: Subject;
  instructors: Instructor[];
  student_marks: marksReference;
  studentId: String;
  attendance: attendanceReference;
  charts: Chart[];

  constructor(
    private subjectService: SubjectService,
    private instructorService: InstructorService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.charts = new Array();
    this.route.params
    //.switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
    .subscribe(params => {
          console.log('param = ' + params['id']);
          this.getSubject(params['id']);
          this.studentId = params['anotherid'];
          console.log("STUDENT ID");
          console.log(this.studentId);
          //console.log(classroom);
          //this.classroom = classroom as Classroom
      });
  }

  updateInternalMarks(form: NgForm): void {
    console.log(form.value);
    this.student_marks.internal1 = form.value.internal1;
    this.student_marks.internal2 = form.value.internal2;
    this.student_marks.internal3 = form.value.internal3;

    for(var i=0; i<this.subject.internal_marks.length; i++){
      if(this.subject.internal_marks[i].student_id == this.studentId){
        this.subject.internal_marks[i].internal1 = this.student_marks.internal1;
        this.subject.internal_marks[i].internal2 = this.student_marks.internal2;
        this.subject.internal_marks[i].internal3 = this.student_marks.internal3;
      }
    }
    this.subjectService.update(this.subject);
  }

  updateAttendance(form: NgForm) : void {
    console.log(form.value);
    this.attendance.quarter1 = form.value.quarter1;
    this.attendance.quarter2 = form.value.quarter2;
    this.attendance.quarter3 = form.value.quarter3;
    for(var i=0; i<this.subject.attendance.length; i++){
      if(this.subject.attendance[i].student_id == this.studentId){
        this.subject.attendance[i].quarter1 = this.attendance.quarter1;
        this.subject.attendance[i].quarter2 = this.attendance.quarter2;
        this.subject.attendance[i].quarter3 = this.attendance.quarter3;
      }
    }
    this.subjectService.update(this.subject);
}

  getInternalMarks(): void {
    console.log("Running getInternalMarks()");
    if(this.subject.internal_marks != []){
      //for updating in the view
      for(var internal_mark of this.subject.internal_marks){
        if(internal_mark.student_id == this.studentId){
          this.student_marks = internal_mark;
          console.log("GOT STUDENT MARKS");
          console.log(this.student_marks);
        }
      }
      if(this.student_marks == null){
      //add subject details for the first time
        this.subject.internal_marks.push({student_id:this.studentId, internal1: 0, internal2: 0, internal3: 0} as marksReference);
        this.student_marks = {student_id:this.studentId, internal1: 0, internal2: 0, internal3: 0} as marksReference;
      }
    }else{
      //add subject details for the first time
      this.subject.internal_marks.push({student_id:this.studentId, internal1: 0, internal2: 0, internal3: 0} as marksReference);
      this.student_marks = {student_id:this.studentId, internal1: 0, internal2: 0, internal3: 0} as marksReference;
    }
  }

  getAttendanceData(): void {
    console.log("Running getAttendance()");
    if(this.subject.attendance != []){
      //for updating in the view
      for(var atten of this.subject.attendance){
        if(atten.student_id == this.studentId){
          this.attendance = atten;
          console.log("GOT ATTENDANCE");
          console.log(this.attendance);
        }
      }
      if(this.attendance == null){
        this.subject.attendance.push({student_id:this.studentId, quarter1: 0, quarter2: 0, quarter3: 0} as attendanceReference);
        this.attendance = {student_id:this.studentId, quarter1: 0, quarter2: 0, quarter3: 0} as attendanceReference;
      //add subject details for the first time
      }
    }else{
      //add subject details for the first time
      this.subject.attendance.push({student_id:this.studentId, quarter1: 0, quarter2: 0, quarter3: 0} as attendanceReference);
      this.attendance = {student_id:this.studentId, quarter1: 0, quarter2: 0, quarter3: 0} as attendanceReference;
    }
  }

  getSubject(id: String): void {
    this.subjectService
        .getSubject(id)
        .then(subject => {
          console.log("Running getSubject()");
          //console.log(classroom);
          this.subject = subject;
          this.getInternalMarks();
          this.getAttendanceData();
          //console.log(this.classroom);
          console.log("Instructors => ");
          console.log(this.subject.instructors);
          if(this.subject.instructors != []){
            console.log(this.subject.instructors);
            this.instructors = new Array();
            for(var i=0; i<this.subject.instructors.length; i++){
              console.log('getting instructor ' + this.subject.instructors[i].object_id);
              this.getInstructor(this.subject.instructors[i].object_id);
            }
          }

          var internal_analytics= this.performInternalAnalytics();
          var attendance_analytics= this.performAttendanceAnalytics();
          //console.log(analytics);
          this.charts.push(internal_analytics);
          this.charts.push(attendance_analytics);
        });
  }

  performAnalytics() : void {
    //internals
    //attendance
    //marks vs attendance
    //portion completion
  }

  getInstructor(id: String) : void {

    this.instructorService.getInstructors().then((instructors:Instructor[]) => {
      for(var i=0; i<instructors.length; i++){
        if(instructors[i]._id == id){
          this.instructors.push(instructors[i]);
        }
      }
      console.log(instructors);
    })
  }

  createInstructor(): void {
    this.router.navigate(['/instructorcreate', this.subject._id]);
  }

  save(): void {
    this.subjectService.update(this.subject)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  goToInstructorDetail(instructor: Instructor): void {
    this.router.navigate(['/instructordetail', instructor._id]);
  }

  /*performAttendanceAnalysis() : Chart {
    var cat1 = 0;
    var cat2 = 0;
    var cat3 = 0;
    var cat4 = 0;
    var analysis = '';
    for(var i=0; i<this.subject.internal_marks.length; i++){
      if(this.subject.attendance[i].quarter1 >= 75){
        cat4 = cat4+1;
      }else if(this.subject.attendance[i].quarter1 >= 60){
        cat3 = cat3+1;
      }else if(this.subject.attendance[i].quarter1 >= 45){
        cat2 = cat2+1;
      }else{
        cat1 = cat1+1;
      }
    }

    if(cat4>=cat1 && cat4>=cat2 && cat4>=cat3  ){
      analysis = "This subject is well attended by students."
    }else if(cat3>=cat1 && cat3>=cat2 && cat3>=cat4){
      analysis = "This subject is mediocrely attended by students."
    }else if(cat2>=cat1 && cat2>=cat3 && cat2>=cat4){
      analysis = "This subject is very less attended by students."
    }else {
      analysis = "This subject is critically less attended by students."
    }
    var labels = [cat1, cat2, cat3, cat4]
    return {
      type: 'Pie', //Student attendence falling range
      data: {series:labels},
      description: "Attendance ranges",
      analysis : analysis,
      options: {
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        total: 15,
        showLabel: false
      }
    } as Chart;
  }*/


  performAttendanceAnalytics(): Chart {
    let quarter1 = this.attendance.quarter1;
    var quarter2 = this.attendance.quarter2;
    var quarter3 = this.attendance.quarter3;
    var analysis = '';
    var label = ['0', 'Q1', 'Q2', 'Q3'];
    var series = new Array();

    if(quarter1 && quarter2){
      //int1+int2 -> Avg
      //label -> 0 1 2
      //series = [[0, int1], [null, int1, int2]]
      series.push([0, quarter1]);
      series.push([null, quarter1, quarter2]);

    }else{
        //int1
        var cons = 30;
        var num2 = 150 - (quarter1 as any);
        var num3 = 0;
        if(num2 >= 100){
          num2 = (225 - (quarter1 as any))/2;
          num3 = (225 - (quarter1 as any))/2;
        }
        //label -> 0 1 2
        //series = [[0, int1], [null, int1, int2]]
        series.push([0, quarter1, null, null]);
        series.push([null, quarter1, num2, null]);
        if(num3){
          series.push([null, null, num2, num3]);
        }
    }

    if(quarter1.valueOf() >= 75){
      analysis= "The student has enough attendance in this subject."
    }else if(quarter1.valueOf() >= 60){
      analysis= "The student has less attendance in this subject."
    }else if(quarter1.valueOf() >= 45){
      analysis= "The student has very less attendance in this subject. Needs attention!"
    }


    if(!quarter1 && !quarter2){
      analysis = "Enter enough data for analytics"
      series = []
      series.push([0, 0, 0, 0]);
    }
    return {
      type: 'Line', // Attendance
      data: {labels:label, series:series},
      description: "Attendance",
      analysis: analysis,
    }as Chart;
  }


  performInternalAnalytics(): Chart {
    let int1 = this.student_marks.internal1;
    var int2 = this.student_marks.internal2;
    var int3 = this.student_marks.internal3;
    var int3Analysis;
    var analysis = '';
    var label = ['0', '1', '2', '3'];
    var series = new Array();

    var cons = 30;
    var num2 = cons - int1.valueOf();

    if(int1 && int2){
      //int1+int2 -> Avg
      //label -> 0 1 2
      //series = [[0, int1], [null, int1, int2]]
      series.push([0, int1]);
      series.push([null, int1, int2]);

      if((int1.valueOf() + int2.valueOf()) < 30){
        if((int1.valueOf() > int2.valueOf())){
          int3Analysis = 30 - int1.valueOf();
          series.push([null, null, int2, int3Analysis]);
        }else{
          int3Analysis = 30 - int2.valueOf();
          series.push([null, null, int2, int3Analysis]);
        }
      }


    }else{
        //int1

        if(num2 > 25){
          num2 = 15;
          int3 = 15;
        }
    }
        if(int1.valueOf() >= 20){
          analysis= "Excellent internal performance in this subject."
        }else if(int1.valueOf() >= 15){
          analysis= "Average internal performance in this subject."
        }else if(num2.valueOf() >= 20){
          analysis= "Poor internal performance in this subject. Needs attention!"
        }else if(num2.valueOf() >= 15){
          analysis= "Less than average internal performance in this subject."
        }else if(num2.valueOf() >= 10){
          analysis= "Good internal performance in this subject."
        }else if(num2.valueOf() >= 5){
          analysis= "Excellent internal performance in this subject."
        }

        if((int1.valueOf() + int2.valueOf()) < 30){
          analysis= "The Student has less than average, he has to score " + int3Analysis + "/25 in the 3rd internals"
        }

        console.log(int1);
        console.log(int2);
        console.log(int3);
        //label -> 0 1 2
        //series = [[0, int1], [null, int1, int2]]
        series.push([0, int1, null, null]);
        series.push([null, int1, num2, null]);
        if(int3){
          series.push([null, null, num2, int3]);
        }




    /*return {
      type: 'Bar', // Internals
      data: {labels:labels, series:series},
      description: "Internals",
      analysis: analysis
    } as Chart;*/
    if(!int1 && !int2){
      analysis = "Enter enough data for analytics"
      series= []
      series.push([0, 0, 0, 0]);
    }
    return {
      type: 'Line', //Internals
      data: {labels:label, series: series},
      description: "Internals",
      analysis: analysis,
    } as Chart;
    // {labels:labels, series:series, analysis: analysis};
  }

  findCategory(value: Number): Number{
    if(value > 20){
      return 5;
    }else if(value > 15){
      return 4;
    }else if(value > 10){
      return 3;
    }else if(value > 5){
      return 2;
    }else{
      return 1;
    }
  }

}
