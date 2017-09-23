import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css'],
  providers: []
})
export class CreateClassroomComponent {
  
  departments = ["Computer science", "Other department"];
  submitted = false;
  name : String;
  section : String;
  semester : Number;
  department : String;
  year_of_passing : Number;

  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }
  
}
