import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AngularFire } from 'angularfire2';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {

  profile: FirebaseObjectObservable<any[]>;
  uid: string;

  constructor(public af: AngularFire, private router: Router) {
    //var uid : string = this.af.auth.

    this.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("not logged out");
          //this.user_displayName = '';
          //this.user_email = '';
          this.router.navigate(['login']);
        } else {
          //this.user_displayName = auth.google.displayName;
          //this.user_email = auth.google.email;
          console.log("Logged in");
          this.uid = auth.uid;
          this.af.database.object('/profiles/'+this.uid+'/').subscribe(
            (profile)=>{
              if(profile !=null){
                this.profile = profile;
                console.log(profile.first_name);
              }
            }
          )
        }
      }
    );
  }

  updateProfile(profile: FirebaseObjectObservable<any[]>): void {
      //this.af.database.object('/profiles/'+this.uid+'/').update(this.profile.);
      console.log(profile['first_name']);
      //var key = profile.key;
      //delete house.$key
      //this._houses.update(key, house)
      //this.profile.phone_no
      this.af.database.object('/profiles/'+this.uid+'/').update({first_name: profile['first_name'],
                                                                 last_name: profile['last_name'],
                                                                 email: profile['email'],
                                                                 phone_no: profile['phone_no']}).then(_ => console.log('updated profile ' + this.uid + '.'));
      //profile.update(profile);
      console.log("updated profile.");
  }

  ngOnInit(): void {
  }
}
