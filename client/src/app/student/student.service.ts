import { Injectable } from '@angular/core';
import { Student } from './student';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StudentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private studentUrl = 'http://localhost:8080/api/Student';  // URL to web api

  constructor(private http: Http) { }

  getStudents(): Promise<Student[]> {
    return this.http.get(this.studentUrl)
               .toPromise()
               .then(response => response.json() as Student[])
               .catch(this.handleError);
  }

  getStudent(id: String): Promise<Student> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Student)
      .catch(this.handleError);
  }

  delete(id: String): Promise<void> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(student: Student): Promise<Student> {
    return this.http
      .post(this.studentUrl, JSON.stringify(student), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Student)
      .catch(this.handleError);
  }

  update(student: Student): Promise<Student> {
    const url = `${this.studentUrl}/${student._id}`;
    return this.http
      .put(url, JSON.stringify(student), {headers: this.headers})
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}