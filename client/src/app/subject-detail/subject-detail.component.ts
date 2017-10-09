import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Subject } from '../subject/subject'
import { Instructor } from '../instructor/instructor'
import { SubjectService } from '../subject/subject.service'
import { InstructorService } from '../instructor/instructor.service'
import { portionReference } from '../subject/subject'

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
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css'],
  providers: [SubjectService, InstructorService]
})

export class SubjectDetailComponent implements OnInit {
  departments = ["Computer science", "Other department"]
  subject: Subject;
  instructors: Instructor[];
  charts: Chart[];
  portionCompletion: portionReference;

  constructor(
    private subjectService: SubjectService,
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.charts = [];
    this.route.params
    //.switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
    .subscribe(params => {
          console.log('param = ' + params['id']);
          this.getSubject(params['id']);
          //console.log(classroom);
          //this.classroom = classroom as Classroom
      });
  }

  getSubject(id: String): void {
    this.subjectService
        .getSubject(id)
        .then(subject => {
          console.log("Running getSubject()");
          //console.log(classroom);
          this.subject = subject;
          var internal_analysis = this.performInternalAnalytics();
          var avg_analysis = this.performAvgAnalytics();
          var attendance_analysis = this.performAttendanceAnalysis();
          var attendance_vs_marks= this.performAttendanceVsMarks();
          //var portions= this.performPortionCompletion();
          //console.log(this.subject.portionCompletion);
          //this.portionCompletion = this.subject.portionCompletion;
          this.charts.push(internal_analysis);
          this.charts.push(avg_analysis);
          this.charts.push(attendance_analysis);
          this.charts.push(attendance_vs_marks);
          //this.charts.push(portions);
          console.log(this.charts);
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
        });
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

  updatePortion(form:NgForm) {
    console.log(form.value);
  }

  performAttendanceVsMarks() : Chart {
    var cat1 = 0;
    var cat2 = 0;
    var series = [];
    var labels = [];
    var analysis = '';
    for(var i=0; i<this.subject.internal_marks.length; i++){
        labels.push(this.subject.internal_marks[i].internal1);
        series.push(this.subject.attendance[i].quarter1);
    }

    var ser = [series];
    analysis = "You can observe the various scattered attendance vs marks data points of students"

    if(series.length === 0){
      analysis = "Data needs to be updated for analystics"
    }

    return {
    type: 'Line', //attendance vs marks
    data: {labels:labels, series:ser},
    description: "attendance vs marks",
    analysis: analysis,
    options: {
      showLine: false
      }
    } as Chart;
  }

  performAttendanceAnalysis() : Chart {
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


    if(!cat1 && ! cat2 && !cat3 && !cat4){
      analysis = "Data needs to be updated for analystics"
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
  }

  performInternalAnalytics(): Chart {
    var cat1 = 0;
    var cat2 = 0;
    var cat3 = 0;
    var cat4 = 0;
    var cat5 = 0;
    var analysis = '';

    for(var i=0; i<this.subject.internal_marks.length; i++){
      var cat = this.findCategory(this.subject.internal_marks[i].internal1);
      if(cat == 5){
        cat5 = cat5 + 1;
      }else if(cat == 4){
        cat4 = cat4 + 1;
      }else if(cat == 3){
        cat3 = cat3 + 1;
      }else if(cat == 2){
        cat2 = cat2 + 1;
      }else{
        cat1 = cat1 + 1;
      }
    }
    var labels = ['0-5', '5-10', '10-15', '15-20', '20-25'];
    var series = [[cat1, cat2, cat3, cat4, cat5]];

    if(cat5>=cat1 && cat5>=cat2 && cat5>=cat3 && cat5>=cat4  ){
      analysis = "This subject is excellently handled in this class."
    }else if(cat4>=cat1 && cat4>=cat2 && cat4>=cat3 && cat4>=cat5  ){
      analysis = "This subject is well handled as most of them have an average score."
    }else if(cat3>=cat1 && cat3>=cat2 && cat3>=cat4 && cat3>=cat5  ){
      analysis = "This subject needs attention as most of them have below average score."
    }else if(cat2>=cat1 && cat2>=cat3 && cat2>=cat4 && cat2>=cat5  ){
      analysis = "This subject needs attention as most of them have below average score."
    }else {
      analysis = "This subject is critical as most of them have highly poor score."
    }


    if(!cat1 && ! cat2 && !cat3 && !cat4 && !cat5){
      analysis = "Data needs to be updated for analystics"
    }


    return {
      type: 'Bar', // Internals
      data: {labels:labels, series:series},
      description: "Internals",
      analysis: analysis
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

  performAvgAnalytics() : Chart {
    var yes = 0;
    var no = 0;
    var analysis = '';
    for(var i=0; i<this.subject.internal_marks.length; i++){
      if(this.subject.internal_marks[i].internal1 > 15){
        yes = yes+1;
      }else{
        no = no+1;
      }
    }
    var labels = ['<Avg', '>Avg'];
    var series = [no, yes];
    if(yes > no && yes >= no + 10){
      analysis = "This subject is excellently handled as its students have pretty good average."
    }else if(yes > no && yes >= no + 5){
      analysis = "This subject is well handled as its students have almost equal results."
    }else if(yes >= no){
      analysis = "This subject has equal results."
    }else if(no > yes){
      analysis = "This subject needs attention."
    }

    if(!yes && !no){
      analysis = "Data needs to be updated for analystics"
    }
    /*
    return {
      type: 'Bar', // Internals
      data: {labels:labels, series:series},
      description: "Internals",
      analysis: analysis
    } as Chart;*/
    return {
      type: 'Bar', // Avg vs no Avg
      data: {labels:labels, series:series},
      description: "Internal average",
      analysis: analysis,
      options: {
        distributeSeries: true
      }
    } as Chart;
  }

  performPortionCompletion(){
    var labels = ['Feb', 'March', 'April', 'May'];
    var series = new Array();
    if(this.portionCompletion.Feb){
      var left = 8 - (this.portionCompletion.Feb as any);
      var num = left / 3;
      series.push([this.portionCompletion.Feb, num, num, num]);
    }
    return {
      type: 'Line', // Portion completion //in subject-detail
      data: {labels:labels, series:series},
      description: "Portion completion",
      analysis: "Analysis",
      options: {
        low: 0,
        showArea: true
      }
    } as Chart;
  }


  addInstructor(): void {
    this.router.navigate(['/addInstructor', this.subject._id]);
  }

  save(): void {
    console.log(this.subject);
    this.subjectService.update(this.subject)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  goToInstructorDetail(instructor: Instructor): void {
    this.router.navigate(['/instructordetail', instructor._id]);
  }

}
