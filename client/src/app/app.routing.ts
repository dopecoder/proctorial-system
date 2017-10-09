import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ClassroomComponent } from "./classroom/classroom.component";
import { StudentComponent } from "./student/student.component";
import { ClassroomDetailComponent } from "./classroom-detail/classroom-detail.component"
import { StudentDetailComponent } from "./student-detail/student-detail.component"
import { ClassroomCreateComponent } from "./classroom-create/classroom-create.component"
import { StudentCreateComponent } from "./student-create/student-create.component"
import { StudentFilterComponent } from "./student-filter/student-filter.component"
import { ChartComponent } from "./chart/chart.component"
import { StudentAnalyticsComponent } from './student-analytics/student-analytics.component';
import { ClassroomAnalyticsComponent } from './classroom-analytics/classroom-analytics.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorCreateComponent } from './instructor-create/instructor-create.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { StudentSubjectDetailComponent } from './student-subject-detail/student-subject-detail.component';
import { CreateClassroomComponent } from "./create-classroom/create-classroom.component";
import { ProfileComponent } from './profile/profile.component'



import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';



const menu_routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },

  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home/:id',  component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'student-analytics',  component: CreateClassroomComponent, canActivate: [AuthGuard]  },
  { path: 'classroom-analytics',  component: ClassroomAnalyticsComponent, canActivate: [AuthGuard]  },
  { path: 'classrooms', component: ClassroomComponent, canActivate: [AuthGuard]  },
  { path: 'students', component: StudentComponent, canActivate: [AuthGuard]  },
  { path: 'students-filter', component: StudentFilterComponent, canActivate: [AuthGuard]  },
  { path: 'studentdetail/:id', component: StudentDetailComponent, canActivate: [AuthGuard]},
  { path: 'classroomdetail/:id', component: ClassroomDetailComponent, canActivate: [AuthGuard]},
  { path: 'classroomcreate', component: ClassroomCreateComponent, canActivate: [AuthGuard]},
  { path: 'studentcreate/:id', component: StudentCreateComponent, canActivate: [AuthGuard] },
  { path: 'subjectcreate/:id', component: SubjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'instructorcreate', component: InstructorCreateComponent, canActivate: [AuthGuard] },
  { path: 'addInstructor/:id', component: InstructorComponent, canActivate: [AuthGuard] },
  { path: 'instructors', component: InstructorComponent, canActivate: [AuthGuard] },
  { path: 'subjectdetail/:id', component: SubjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'subjectdetail/:id/:anotherid', component: StudentSubjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'instructordetail/:id', component: InstructorDetailComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //{ path: 'login-user', component: AppComponent, canActivate: [AuthGuard] }

];

export const main_routing = RouterModule.forRoot(menu_routes);
