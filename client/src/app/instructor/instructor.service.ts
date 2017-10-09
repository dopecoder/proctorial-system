import { Injectable } from '@angular/core';
import { Instructor } from './instructor';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class InstructorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private instructorUrl = 'http://localhost:8080/api/Instructor';  // URL to web api

  constructor(private http: Http) { }

  getInstructors(): Promise<Instructor[]> {
    return this.http.get(this.instructorUrl)
               .toPromise()
               .then(response => response.json() as Instructor[])
               .catch(this.handleError);
  }

  getInstructor(id: String): Promise<Instructor> {
    const url = `${this.instructorUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Instructor)
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
    console.log(instructor);
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
}
