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

@Component({
  selector: 'app-classroom-analytics',
  templateUrl: './classroom-analytics.component.html',
  styleUrls: ['./classroom-analytics.component.css']
})

export class ClassroomAnalyticsComponent {
  charts: Chart[];

  constructor() {
    this.charts = [{
      type: 'Bar', // Internals
      data: data['Bar'],
      description: "Internals"
    }, {
      type: 'Line', // Attendance
      data: data['Line'],
      description: "Attendance"
    },{
      type: 'Line', //attendance vs marks
      data: data['Scatter'],
      description: "attendance vs marks",
      options: {
        showLine: false
        /*axisX: {
          labelInterpolationFnc: function(value: number, index: number): string {
            return index % 13 === 0 ? `W${value}` : null;
          }*/
        }
      },
      /*responsiveOptions: [
        ['screen and (min-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function(value: number, index: number): string {
              return index % 4 === 0 ? `W${value}` : null;
            }
          }
        }]
      ]
    },*/ {
      type: 'Line', // Portion completion //in subject-detail
      data: data['LineWithArea'],
      description: "Portion completion",
      options: {
        low: 0,
        showArea: true
      }
    }, {
      type: 'Bar', // Avg vs no Avg
      data: data['DistributedSeries'],
      description: "Average students",
      options: {
        distributeSeries: true
      }
    }, {
      type: 'Pie', //Student attendence falling range
      data: data['Pie'],
      description: "attendance ranges",
      options: {
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        total: 200,
        showLabel: false
      }
    }];
  }
}
