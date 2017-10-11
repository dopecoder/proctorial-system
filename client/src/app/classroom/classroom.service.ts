import { Injectable } from '@angular/core';
import { Classroom } from './classroom';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ClassroomService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private classroomUrl = 'http://35.198.205.84:8080/api/Classroom';  // URL to web api

  constructor(private http: Http) { }

  getClassrooms(): Promise<Classroom[]> {
    return this.http.get(this.classroomUrl)
               .toPromise()
               .then(response => response.json() as Classroom[])
               .catch(this.handleError);
  }

  getClassroom(id: String): Promise<Classroom> {
    const url = `${this.classroomUrl}/${id}`;
    console.log("Calling getClassroom with : " + url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Classroom)
      .catch(this.handleError);
  }

  delete(id: String): Promise<void> {
    const url = `${this.classroomUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(classroom: Classroom): Promise<Classroom> {
    return this.http
      .post(this.classroomUrl, JSON.stringify(classroom), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Classroom)
      .catch(this.handleError);
  }

  update(classroom: Classroom): Promise<Classroom> {
    const url = `${this.classroomUrl}/${classroom._id}`;
    return this.http
      .put(url, JSON.stringify(classroom), {headers: this.headers})
      .toPromise()
      .then(() => classroom)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
