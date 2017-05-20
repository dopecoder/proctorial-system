import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Student } from '../student/student'
import { Subject } from '../subject/subject'
import { Classroom } from '../classroom/classroom'
import { StudentService } from '../student/student.service'
import { SubjectService } from '../subject/subject.service'
import { ClassroomService } from '../classroom/classroom.service'
import { SubjectReference } from '../classroom/classroom'
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
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  providers: [StudentService, SubjectService, ClassroomService]
})
export class StudentDetailComponent implements OnInit {
  student: Student;
  subjects: Subject[];
  subjectList: SubjectReference[];
  charts: Chart[];

  constructor(
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.subjects = [];
    this.subjectList = [];
    this.charts = [];
  }

  ngOnInit(): void {
    this.route.params
    .subscribe(params => {
          console.log('param = ' + params['id']);
          this.getStudent(params['id']);
          //this.getSubjects();
          //console.log(classroom);
          //this.classroom = classroom as Classroom
      });
  }

  getSubjects(): void {
    console.log("classroom_id");
    console.log(this.student);
    this.classroomService.getClassroom(this.student.classroom_id).then((classroom: Classroom) => {
      console.log(classroom.subjects);
      this.subjectList = classroom.subjects as SubjectReference[];
      for(var subject of this.subjectList){
        this.subjectService.getSubject(subject.object_id).then((subject: Subject) => {
          this.subjects.push(subject);
        });
      }
      });
  }

  getStudent(id: String): void {
    this.studentService
        .getStudent(id)
        .then(student => {
          console.log("Running getClassroom()");
          console.log(student);
          this.student = student;
          console.log(this.student);
          this.getSubjects();

          console.log(this.performOverallPerformance());
          this.charts.push(this.performOverallPerformance());
        });
  }

  performOverallPerformance(){
    var labels = ['10', '12', '1', '2', '3', '4', '5'];
    var series = [[this.student.marks.elementary, this.student.marks.associate, this.student.marks.first, this.student.marks.second, this.student.marks.third, this.student.marks.fourth, this.student.marks.fifth]];
    //var series = [[80, 70, 80, 80 ,70 ,80 ,80]];
    var analysis = '';
    /*if(this.portionCompletion.Feb){
      var left = 8 - (this.portionCompletion.Feb as any);
      var num = left / 3;
      series.push([this.portionCompletion.Feb, num, num, num]);
    }*/
    var avg_count = 0;
    var good_count = 0;
    var poor_count = 0;
    for(var ser of series[0]){
      if(ser > 60){
        avg_count=avg_count+1;
      }else if(ser > 70){
        good_count=good_count+1;
      }else if(ser < 50){
        poor_count=poor_count+1;
      }
    }
    if(avg_count > good_count && avg_count > poor_count){
      analysis = "The student has an average track record of marks throughout."
    }else if(avg_count > good_count){
      analysis = "The student has an average track record of marks throughout."
    }else if(good_count > poor_count) {
      analysis = "The student has a good track record of marks throughout."
    }else {
      analysis = "The student has a poor track record of marks throughout."
    }
    return {
      type: 'Line', // Portion completion //in subject-detail
      data: {labels:labels, series:series},
      description: "Overall semester performance",
      analysis: analysis,
      options: {
        low: 0,
        showArea: true
      }
    } as Chart;
  }

  goToSubjectDetail(subject: Subject): void {
    this.router.navigate(['/subjectdetail', subject._id, this.student._id]);
  }

  save(): void {
    this.student.backlogs = { current : 2, dead : 0 };
    this.studentService.update(this.student)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}