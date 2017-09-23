import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ClassroomComponent } from "./classroom/classroom.component";
import { StudentComponent } from "./student/student.component";
import { ClassroomDetailComponent } from "./classroom-detail/classroom-detail.component"
import { StudentDetailComponent } from "./student-detail/student-detail.component"
import { ClassroomCreateComponent } from "./classroom-create/classroom-create.component"
import { StudentCreateComponent } from "./student-create/student-create.component"
import { ChartComponent } from "./chart/chart.component"
import { StudentAnalyticsComponent } from './student-analytics/student-analytics.component';
import { ClassroomAnalyticsComponent } from './classroom-analytics/classroom-analytics.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { InstructorCreateComponent } from './instructor-create/instructor-create.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { StudentSubjectDetailComponent } from './student-subject-detail/student-subject-detail.component';
import { CreateClassroomComponent } from "./create-classroom/create-classroom.component";
import { ProfileComponent } from './profile/profile.component'

const menu_routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home',  component: HomeComponent }, //component: HomeComponent},
	{ path: 'student-analytics',  component: CreateClassroomComponent },
	{ path: 'classroom-analytics',  component: ClassroomAnalyticsComponent },
	{ path: 'classrooms', component: ClassroomComponent },
	{ path: 'students', component: StudentComponent },
  { path: 'studentdetail/:id', component: StudentDetailComponent},
  { path: 'classroomdetail/:id', component: ClassroomDetailComponent },
  { path: 'classroomcreate', component: ClassroomCreateComponent},
  { path: 'studentcreate/:id', component: StudentCreateComponent },
  { path: 'subjectcreate/:id', component: SubjectCreateComponent },
  { path: 'instructorcreate/:id', component: InstructorCreateComponent },
  { path: 'subjectdetail/:id', component: SubjectDetailComponent },
  { path: 'subjectdetail/:id/:anotherid', component: StudentSubjectDetailComponent },
  { path: 'instructordetail/:id', component: InstructorDetailComponent },
  { path: 'profile', component: ProfileComponent }
  
];

export const main_routing = RouterModule.forRoot(menu_routes);
