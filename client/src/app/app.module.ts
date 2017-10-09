import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';




import { AngularFireModule } from 'angularfire2';
//import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
//import { routes } from './app.routes';




import { AppComponent } from './app.component';
import { MenuComponent } from './menu.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { main_routing } from './app.routing';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ClassroomCreateComponent } from './classroom-create/classroom-create.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentFilterComponent } from './student-filter/student-filter.component';

import { StudentAnalyticsComponent } from './student-analytics/student-analytics.component';
import { ClassroomAnalyticsComponent } from './classroom-analytics/classroom-analytics.component';

import { ChartistModule } from "ng-chartist/src/chartist.component"
import { AsyncChartComponent } from './async-chart.component';
import { DynamicChartComponent } from './dynamic-chart.component';
import { LiveChartComponent } from './live-chart.component';
import { ChartComponent } from './chart/chart.component';

import { InstructorComponent } from './instructor/instructor.component';
import { InstructorCreateComponent } from './instructor-create/instructor-create.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { StudentSubjectDetailComponent } from './student-subject-detail/student-subject-detail.component';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component'
import { ProfileComponent } from './profile/profile.component'


  // Initialize Firebase
  export const firebaseConfig = {
    apiKey: "AIzaSyDCJ9tHgmpqk906GRAfhSqJOzbpLC8Quxc",
    authDomain: "proctorial-system.firebaseapp.com",
    databaseURL: "https://proctorial-system.firebaseio.com",
    projectId: "proctorial-system",
    storageBucket: "",
    mesagingSenderId: "171077402137"
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    MenuComponent,
    ClassroomComponent,
    StudentComponent,
    HomeComponent,
    ClassroomDetailComponent,
    StudentDetailComponent,
    ClassroomCreateComponent,
    StudentCreateComponent,
    ChartComponent,
    LiveChartComponent,
    AsyncChartComponent,
    DynamicChartComponent,
    StudentAnalyticsComponent,
    ClassroomAnalyticsComponent,
    InstructorComponent,
    InstructorCreateComponent,
    InstructorDetailComponent,
    SubjectComponent,
    SubjectCreateComponent,
    SubjectDetailComponent,
    StudentSubjectDetailComponent,
    CreateClassroomComponent,
    ProfileComponent,
    StudentFilterComponent
  ],
  imports: [
    BrowserModule,
    ChartistModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    main_routing
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
