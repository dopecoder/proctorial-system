import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';
import { Profile } from '../profile/profile';
import { Student } from '../student/student';
import { Classroom } from '../classroom/classroom';
import { Instructor } from '../instructor/instructor';
import { ProfileService } from '../profile/profile.service';
import { StudentService } from '../student/student.service';
import { ClassroomService } from '../classroom/classroom.service';
import { InstructorService } from '../instructor/instructor.service';
import { Subject} from '../subject/subject';
import { SubjectService,  } from '../subject/subject.service';
import { SubjectReference } from '../classroom/classroom'
import * as Chartist from 'chartist';
import { portionReference } from '../subject/subject'

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

export interface iaInterface {
  int1 : String;
  int2 : String;
  int3 : String;
}

export interface attInterface {
  q1 : String;
  q2 : String;
  q3 : String;
}

export interface mySubjects {
  name : String;
  ia : iaInterface;
  attendence : attInterface;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StudentService, ClassroomService, ProfileService, SubjectService, InstructorService]
})

export class HomeComponent {
// data needed : profile object, student object, classroom object for parent login
//              profile object, instructor object, classroom objects for faculty login
//              Admin interface -- to be implemented later
    uid: string;
    profile: FirebaseObjectObservable<Profile>;
    student: Student;
    my_classroom: Classroom;
    subjects : Subject[];
    subjectList: SubjectReference[];
    attendanceAvgVal : String;
    attendanceAvg : String;
    aggregateVal : String;
    aggregate : String;
    positionVal : String;
    position : String;
    studentSubjects : mySubjects[];
    charts: Chart[];

    instructor: Instructor;
    classrooms: Classroom[];

    studentType: boolean = false;
    facultyType: boolean = false;

    totalNoOfStudents = 0;
    totalNoOfPlacementStudents = 0;

    analytics : any[];

    my_subjects: any;
    subject: Subject;
    portionCompletion: portionReference;
    //charts: Chart[];
    // get profile
    // get student this.ss.getStudent(id)
    // get classroom this this.crs.getClassroom(id)
    constructor(private af: AngularFire,
      private route: ActivatedRoute,
      private router: Router,
      private ss: StudentService,
      private crs: ClassroomService,
      private ps: ProfileService,
      private is: InstructorService,
      private subjectService : SubjectService){
      //get all the required data here
      // get uid
      this.route.params
        //.switchMap((params: Params) => this.classroomService.getClassroom(params['id']))
      .subscribe(params => {
              console.log('param = ' + params['id']);
              this.uid = params['id'];
              console.log('uid : ' + this.uid);

              /*
              this.af.auth.subscribe((auth)=>{
                this.af.database.object("/profiles/" + auth.uid + "/my_classrooms/")
              });*/
              this.af.database.object('/profiles/'+this.uid+'/').subscribe(
                (profile)=>{
                this.profile = profile;
                console.log('profile : ' + this.profile['first_name']);
                console.log(this.profile['acc_type']);

                if(this.profile['acc_type'] == 'student'){
                  this.studentType = true;



                this.ss.getStudent(this.profile['student_ref']).then(student=>{
                  this.student = student;
                  console.log('student : ' + this.student);


                this.crs.getClassroom(this.student.classroom_id).then(classroom=>{
                    this.my_classroom = classroom;
                    console.log('my classroom : ' + this.my_classroom)

                  this.getSubjects(this.student).then((subjects)=>{

                    this.subjects = subjects;

                    //console.log(this.subjects);
                    // calculate overall attendance
                    var labelsAndSeries = this.ss.getLabelsAndSeries(this.student);
                    var analysisAndAggr = this.ss.getOverallPerformance(labelsAndSeries);
                    if(this.charts == undefined) this.charts = [];
                    this.charts.push(this.ss.getChartAnalyticsFor(analysisAndAggr, labelsAndSeries));
                    this.aggregate = analysisAndAggr.aggr.toFixed(1);
                    this.aggregateVal = analysisAndAggr.aggr.toFixed(0);
                    console.log("aggregate : " + this.aggregate);
                    //set the aggregate

                    // calculate overall attedance


                    console.log(this.subjects);
                    this.subjects.forEach(function(subject, sub_index){
                      console.log("index : " + sub_index + "Subject : " + subject);
                    });

                    const student_id = this.student._id;
                    var attendance = 0;
                    var count = 0;
                    this.studentSubjects = new Array();
                    var my_subjects = new Array();
                    this.subjects.forEach(function(subject, sub_index){
                      var sub = new Object();
                      sub['name'] = subject.name;
                      sub['attendance'] = new Object();
                      sub['ia'] = new Array();

                      subject.attendance.forEach(function(att, att_index){
                        console.log("Comparing " + att.student_id + " and " + student_id);
                        if(att.student_id == student_id){
                          console.log(att);
                          //var sub = new Object();
                          //sub['name'] = subject.name;
                          //sub['attendance'] = new Object();
                          //sub['ia'] = new Array();
                          if(att.quarter1.valueOf() > 0){
                            console.log("Running quarter1");
                            attendance += att.quarter1.valueOf();
                            sub['attendance']['q1'] = att.quarter1.valueOf();
                            count++;
                          }
                          if(att.quarter2.valueOf() > 0){
                            console.log("Running quarter2");
                            attendance += att.quarter2.valueOf();
                            sub['attendance']['q2'] = att.quarter2.valueOf();
                            count++;
                          }
                          if(att.quarter3.valueOf() >= 0){
                            console.log("Running quarter3");
                            attendance += att.quarter3.valueOf();
                            sub['attendance']['q3'] = att.quarter3.valueOf();
                            if(att.quarter3.valueOf() > 0) count++;
                          }
                          //if(!this.studentSubjects) this.studentSubjects = [];
                          //my_subjects.push(sub);
                        }
                      })

                      console.log(my_subjects);

                      var subject_count = my_subjects.length;

                      //var counter = 0;
                      subject.internal_marks.forEach(function(att, att_index){
                        //var sub = my_subjects[counter];
                        console.log("Currently handling " );
                        console.log(sub);
                        console.log("Comparing " + att.student_id + " and " + student_id);
                        if(att.student_id == student_id){
                          console.log(att);
                          if(att.internal1.valueOf() > 0){
                            console.log("Running internal1");
                            sub['ia']['int1'] = att.internal1.valueOf();
                          }
                          if(att.internal2.valueOf() > 0){
                            console.log("Running internal2");
                            sub['ia']['int2'] = att.internal2.valueOf();
                          }
                          if(att.internal1.valueOf() > 0){
                            console.log("Running internal3");
                            sub['ia']['int3'] = att.internal3.valueOf();
                          }
                          //my_subjects[counter] = sub;
                          my_subjects.push(sub);

                          console.log(my_subjects);
                          //counter++;
                        }
                      });


                    });
                    //var attendanceAvg = 0;
                    console.log(attendance);
                    if(count != 0) {
                      this.attendanceAvg = (attendance / count).toFixed(1);
                      this.attendanceAvgVal = (attendance / count).toFixed(0);
                      this.studentSubjects = my_subjects as mySubjects[];
                      console.log("Average attendance : " + this.attendanceAvg);
                      console.log(this.studentSubjects);
                    }


                    this.getClassStanding().then((studentsUnsortedArray)=>{
                      var sortedArray = this.sortClassStanding(studentsUnsortedArray);
                      console.log(sortedArray);
                      var position = (this.searchPositionOf(student_id, sortedArray) + 1);
                      this.positionVal = (100 - position).toString();
                      this.position = position.toString();
                      console.log("Position : " + position);
                    })
                    /*
                    console.log(this.subjects);
                    if(this.subjects.length != 0){
                      for(var i=0; i<this.subjects.length; i++){
                        for(var j=0; j<this.subjects[i].attendance.length; j++){
                          console.log("Comparing " + this.subjects[i].attendance[j].student_id + " and " + this.student._id.valueOf());
                          if(this.subjects[i].attendance[j].student_id == this.student._id.valueOf()){
                            if(this.subjects[i].attendance[j].quarter1 != 0){
                              console.log(this.subjects[i].attendance[j].quarter1);
                              attendance = this.subjects[i].attendance[j].quarter1.valueOf();
                              count++;
                            }
                            if(this.subjects[i].attendance[j].quarter2 != 0){

                                attendance = this.subjects[i].attendance[j].quarter2.valueOf();
                                count++;
                            }
                            if(this.subjects[i].attendance[j].quarter3 != 0){

                                attendance = this.subjects[i].attendance[j].quarter3.valueOf();
                                count++;
                            }
                          }
                        }
                      }
                      //var attendanceAvg = 0;
                      console.log(attendance);
                      if(count != 0) {
                        this.attendanceAvg = attendance / count;
                        console.log("Average attendance : " + this.attendanceAvg);
                        //set avgAttendance
                      }
                    }*/

                    // calculate class standing
                    // make a database query to sort by aggregate
                  }).catch((e)=>{
                    console.log(e);
                  });
                }).catch((e)=>{
                  console.log(e);
                });

              }).catch((e)=>{
                console.log(e);
              });

            }else if (this.profile["acc_type"] == "faculty") {
                this.facultyType = true;
                this.my_subjects = this.getMySubject();
                this.analytics = new Array();
                //work on faculty


                console.log("In Faculty section : " + this.profile["instructor_ref"]);
                this.is.getInstructors().then((instructors)=>{
                  console.log("Got Instructors");
                  for(var i=0; i<instructors.length; i++){
                    if(instructors[i]._id == this.profile["instructor_ref"]){
                      console.log("Got Instructor");
                      this.instructor = instructors[i];

                      this.subjectService.getSubjects().then((subjects)=>{
                        for(var j=0; j<this.instructor.subjects.length; j++){
                          for(var i=0; i<subjects.length; i++){
                            if(subjects[i]._id == this.instructor.subjects[j]){
                              this.my_subjects.subjects.push(subjects[i]);
                            }
                          }
                        }
                      });


                    }
                  }
                });


                //get classrooms
                setTimeout(()=>{
                  this.classrooms = new Array();
                  if(this.profile["instructor_ref"]){
                    this.crs.getClassrooms().then((classrooms)=>{
                      console.log("Got classrooms");
                        for(var i=0; i<this.instructor.subjects.length; i++){
                          for(var j=0; j<classrooms.length; j++){
                            for(var k=0; k<classrooms[j].subjects.length; k++){
                              if(classrooms[j].subjects[k].object_id == this.instructor.subjects[i]){
                                console.log("Pushing classroom : ");
                                console.log(classrooms[j]);
                                this.classrooms.push(classrooms[j]);
                              }
                            }
                          }
                        }

                        //get no of students handled
                        //var totalNoOfStudents = 0;
                        for(var i=0; i<this.classrooms.length; i++){
                          this.totalNoOfStudents += this.classrooms[i].students.length;
                        }

                        //No of students eligible for placement
                        this.ss.getStudents().then((students)=>{
                          this.onChoice();
                          //var totalNoOfPlacementStudents = 0;
                          for(var i=0; i<this.classrooms.length; i++){
                            for(var j=0; j<this.classrooms[i].students.length; j++){
                              for(var k=0; k<students.length; k++){
                                if(students[k]._id == this.classrooms[i].students[j].object_id){
                                  var labelsAndSeries = this.ss.getLabelsAndSeries(students[k]);
                                  var analysisAndAggr = this.ss.getOverallPerformance(labelsAndSeries);
                                  if(analysisAndAggr.aggr >= 60){
                                    this.totalNoOfPlacementStudents+=1;
                                  }
                                }
                              }
                            }
                          }
                        });




                    });
                  }
                }, 300);
            }
          });
      });

    }

    onChoice(){
      //console.log(new Object(this.my_subjects.current_subject as Subject) );
      //console.log(new Object(this.my_subjects.current_subject) as Subject);
      //this.subject = new Object(this.my_subjects.current_subject) as Subject;
      for(var i=0; i<this.my_subjects.subjects.length; i++){
        console.log(this.my_subjects.subjects[i]);
        var newObj = this.getAnalyticsObj();
        this.subject = this.my_subjects.subjects[i];
        newObj['name'] = this.my_subjects.subjects[i].name;
        var internal_analysis = this.performInternalAnalytics();
        var avg_analysis = this.performAvgAnalytics();
        var attendance_analysis = this.performAttendanceAnalysis();
        var attendance_vs_marks= this.performAttendanceVsMarks();
        newObj['charts'] = [];
        newObj['charts'].push(internal_analysis);
        newObj['charts'].push(avg_analysis);
        newObj['charts'].push(attendance_analysis);
        newObj['charts'].push(attendance_vs_marks);
        this.analytics.push(newObj);
      }
      /*
      var internal_analysis = this.performInternalAnalytics();
      var avg_analysis = this.performAvgAnalytics();
      var attendance_analysis = this.performAttendanceAnalysis();
      var attendance_vs_marks= this.performAttendanceVsMarks();
      this.charts.push(internal_analysis);
      this.charts.push(avg_analysis);
      this.charts.push(attendance_analysis);
      this.charts.push(attendance_vs_marks
      */
    }

    getAnalyticsObj(): Object{
      return new Object({
        name : '',
        graphs : []
      });
    }

    getMySubject(): Object {
      return new Object({
        subjects : [],
        current_subject : 0
      });
    }

    getNewSubject() : Object{
      return new Object({
        subject_name : 'subject',
        ia : {
          int_1 : 1,
          int_2 : 1,
          int_3 : 1
        },
        attendance : {
          q1 : 1,
          q2 : 1,
          q3 : 1
        }
      });
    }

    searchPositionOf(id, studentsSortedArray){
      var count = 0;
      for(var i=0; i<studentsSortedArray.length; i++){
        console.log("comparing " + studentsSortedArray[i].student_id + " and " + id);
        if(studentsSortedArray[i].student_id == id.valueOf()){
          console.log("GOT IN.");
          return i;
        }
      }
    }

    sortClassStanding(studentsUnsortedArray){
      for(var i=0; i<studentsUnsortedArray.length; i++){
        for(var j=0; j<studentsUnsortedArray.length; j++){
          if(studentsUnsortedArray[i].aggregate.valueOf() < studentsUnsortedArray[j].aggregate.valueOf()){
            var temp = studentsUnsortedArray[i];
            studentsUnsortedArray[i] = studentsUnsortedArray[j];
            studentsUnsortedArray[j] = temp;
          }
        }
      }
      return studentsUnsortedArray;
    }

    getClassStanding(){
      return new Promise((resolve, reject)=>{
      var total_students = this.my_classroom.students.length;
      console.log(total_students);
      var studentsUnsortedArray = [];
      this.my_classroom.students.forEach((student, student_idex)=>{
        this.ss.getStudent(student.object_id).then((student_obj)=>{
          if(total_students == 1) {
            console.log(studentsUnsortedArray);
            resolve(studentsUnsortedArray);
          }
          var labelsAndSeries = this.ss.getLabelsAndSeries(student_obj);
          var analysisAndAggr = this.ss.getOverallPerformance(labelsAndSeries);
          var aggregate = analysisAndAggr.aggr.toFixed(0);
          studentsUnsortedArray.push({student_id: student.object_id, aggregate: aggregate});
          total_students--;
        })
      });
    })
    }

    goToDetail(student: Student): void {
      this.router.navigate(['/studentdetail', student._id]);
    }

    getSubjects(student: Student): Promise<any[]> {
      console.log("classroom_id");
      console.log(student);
      console.log(student.classroom_id);
      var subjects = [];
      return new Promise((resolve, reject)=>{
        this.crs.getClassroom(student.classroom_id).then((classroom: Classroom) => {
          //console.log(classroom.subjects);
          console.log(classroom.subjects);
          this.subjectList = classroom.subjects;
          console.log(this.subjectList.length);
          var count = this.subjectList.length;
          for(var sub of this.subjectList){
            this.subjectService.getSubject(sub.object_id).then((subject: Subject) => {
              console.log("count : " + count);
              subjects.push(subject as Subject);
              console.log("Got a subject now.");
              if(count == 1){
                resolve(subjects);
              }
              //this.subjects.push(subject as Subject);
              count--;
            });
          }
          //console.log(subjects.length)
          //if(subjects){
          //  resolve(subjects);
          //}else{
          //  reject("Error");
          //}
         //this.initializeSubjects(student);
        });
      });


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


}
