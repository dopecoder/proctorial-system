import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2'
import { Observable } from 'rxjs/Observable'
//import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/*
export class AppComponent {

    user: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth) {
      this.user = afAuth.;
    }
}*/
export class AppComponent {
  public isLoggedIn: Boolean;
  private uid: String;
  private home_link: String;
  private total_authorization : boolean = false;
  //private user_displayName: String;
  //private user_email: String;
  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("not logged out");
          this.isLoggedIn = false;
          //this.user_displayName = '';
          //this.user_email = '';
          this.router.navigate(['login-email']);
        } else {
          this.isLoggedIn = true;
          this.uid = auth.uid;
          this.home_link = '/home/'+this.uid;
          console.log(this.home_link);
          //this.user_displayName = auth.google.displayName;
          //this.user_email = auth.google.email;
          console.log("Logged in");
          console.log(auth);
          this.af.database.object("/profiles/"+this.uid).subscribe((profile)=>{
            if(!profile.student_ref){
              this.total_authorization = true;
            }
            this.router.navigate([this.home_link]);
          })

        }
      }
    );
  }

  logout(){
    if(this.isLoggedIn){
      this.af.auth.logout();
      //this.router.navigateByUrl('/login');
    }
  }
}
