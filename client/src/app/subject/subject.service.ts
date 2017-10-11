import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class SubjectService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private subjectUrl = 'http://35.198.205.84:8080/api/Subject';  // URL to web api

  constructor(private http: Http) { }

  getSubjects(): Promise<Subject[]> {
    return this.http.get(this.subjectUrl)
               .toPromise()
               .then(response => response.json() as Subject[])
               .catch(this.handleError);
  }

  getSubject(id: String): Promise<Subject> {
    const url = `${this.subjectUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Subject)
      .catch(this.handleError);
  }

  delete(id: String): Promise<void> {
    const url = `${this.subjectUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(subject: Subject): Promise<Subject> {
    return this.http
      .post(this.subjectUrl, JSON.stringify(subject), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Subject)
      .catch(this.handleError);
  }

  update(subject: Subject): Promise<Subject> {
    console.log("Subject updating : ");
    console.log(subject);
    const url = `${this.subjectUrl}/${subject._id}`;
    return this.http
      .put(url, JSON.stringify(subject), {headers: this.headers})
      .toPromise()
      .then(() => subject)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
