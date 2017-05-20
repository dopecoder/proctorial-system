import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../chartist.component';

declare var require: any;

const data: any = require('./data.json');

interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  description: String;
}


interface data {
  labels:[String],
  series:[[Number]]
}

@Component({
  selector: 'app-student-analytics',
  templateUrl: './student-analytics.component.html',
  styleUrls: ['./student-analytics.component.css']
})


export class StudentAnalyticsComponent {
  charts: Chart[];
  internalData : data;
  attendanceData : data;
  overallData : data;
  healthMeter : data;

  constructor() {

    this.internalData = {labels : ['0', '1', '2', '3'], series : [[0, 7], [null, 7, 21, 15]]};
    this.charts = [
    {
      type: 'Line', //Internals
      data: this.internalData,
      description: "Internals"
    }, {
      type: 'Line', //attendance
      data: data['Line2'],
      description: "Attendance"
    }, {
      type: 'Line', //Overall semester wise performance  // show in student-detail
      data: data['LineWithArea'],
      description: "Overall graph",
      options: {
        low: 0,
        showArea: true
      }
    },{
      type: 'Pie', //Health meter //show in student-detail
      data: data['Pie'],
      description: "Health meter",
      options: {
        donut: true,
        donutWidth: 100,
        startAngle: 270,
        total: 200,
        showLabel: true
      }
    }];
  }
}
