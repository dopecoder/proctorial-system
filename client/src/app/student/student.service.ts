import { Injectable } from '@angular/core';
import { Student } from './student';
import { Headers, Http } from '@angular/http';
import * as Chartist from 'chartist';

import 'rxjs/add/operator/toPromise';
import {
  ChartType,
  ChartEvent
} from '../chartist.component';

interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  description: String;
  analysis: String;
}

@Injectable()
export class StudentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private studentUrl = 'http://35.198.205.84:8080/api/Student';  // URL to web api

  constructor(private http: Http) { }

  getStudents(): Promise<Student[]> {
    return this.http.get(this.studentUrl)
               .toPromise()
               .then(response => response.json() as Student[])
               .catch(this.handleError);
  }

  getStudent(id: String): Promise<Student> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Student)
      .catch(this.handleError);
  }

  delete(id: String): Promise<void> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(student: Student): Promise<Student> {
    return this.http
      .post(this.studentUrl, JSON.stringify(student), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Student)
      .catch(this.handleError);
  }

  update(student: Student): Promise<Student> {
    const url = `${this.studentUrl}/${student._id}`;
    return this.http
      .put(url, JSON.stringify(student), {headers: this.headers})
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  getLabelsAndSeries(student: Student) {
    var labels = ['10', '12', '1', '2', '3', '4', '5', '6', '7'];
    var series = [[student.marks.elementary, student.marks.associate, student.marks.first, student.marks.second, student.marks.third, student.marks.fourth, student.marks.fifth, student.marks.sixth, student.marks.seventh]];
    return {
      labels : labels,
      series : series
    }
  }

  getOverallPerformance(labelsAndSeries){
    //var series = [[80, 70, 80, 80 ,70 ,80 ,80]];
    var series = labelsAndSeries.series;
    var labels = labelsAndSeries.labels;
    var analysis = '';
    /*if(this.portionCompletion.Feb){
      var left = 8 - (this.portionCompletion.Feb as any);
      var num = left / 3;
      series.push([this.portionCompletion.Feb, num, num, num]);
    }*/
    var avg_count = 0;
    var good_count = 0;
    var poor_count = 0;
    var aggr = 0;
    for(var ser of series[0]){
      if(ser > 70){
        good_count=good_count+1;
      }else if(ser > 55){
        avg_count=avg_count+1;
      }else if(ser > 35){
        poor_count=poor_count+1;
      }
    }
    if(avg_count > good_count && avg_count > poor_count){
      analysis = "\"The student has an average track record of marks throughout\""
    }else if(avg_count > good_count){
      analysis = "\"The student has an average track record of marks throughout\""
    }else if(good_count > poor_count) {
      analysis = "\"The student has a excellent track record of marks throughout\""
    }else {
      analysis = "\"The student has a poor track record of marks throughout\""
    }

    var count = 0;
    for(var i=2; i<8; i++){
      if(series[0][i].valueOf()){
        count++;
        aggr = aggr+series[0][i].valueOf();
      }
    }

    aggr = aggr / count;

    analysis = analysis + ' Aggregate : ' + aggr.toString() + '%';

    if(!avg_count && !good_count && !poor_count){
      analysis = "Enter enough data for analytics"
    }

    //console.log(series);
    return {
      analysis: analysis,
      aggr: aggr
    };
  }

  getChartAnalyticsFor(analysis, labelsAndSeries) {
  var series = labelsAndSeries.series;
  var labels = labelsAndSeries.labels;
    return {
      type: 'Line', // Portion completion //in subject-detail
      data: {labels:labels, series:series},
      description: "Overall semester performance",
      analysis: analysis.analysis,
      options: {
        low: 0,
        showArea: true
      }
    } as Chart;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
