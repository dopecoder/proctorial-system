import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { Headers, Http } from '@angular/http';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProfileService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private instructorUrl = 'http://localhost:8080/api/Instructor';  // URL to web api

  constructor(public af: AngularFire) { }

  getProfile(id: String, callback: Function) {
    const path = '/profiles/'+id+'/';
    console.log("Called get profile! " + path);
    this.af.database.object(path).subscribe((profile)=>{
      console.log(profile as Profile);
      callback(profile);
    });
  }

    /*
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

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Instructor)
      .catch(this.handleError);
      */


/*
  getInstructors(): Promise<Instructor[]> {
    return this.http.get(this.instructorUrl)
               .toPromise()
               .then(response => response.json() as Instructor[])
               .catch(this.handleError);
  }

  delete(id: String): Promise<void> {
    const url = `${this.instructorUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(instructor: Instructor): Promise<Instructor> {
    return this.http
      .post(this.instructorUrl, JSON.stringify(instructor), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Instructor)
      .catch(this.handleError);
  }

  update(instructor: Instructor): Promise<Instructor> {
    const url = `${this.instructorUrl}/${instructor._id}`;
    return this.http
      .put(url, JSON.stringify(instructor), {headers: this.headers})
      .toPromise()
      .then(() => instructor)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  */

}
