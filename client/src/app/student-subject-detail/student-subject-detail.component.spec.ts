import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectDetailComponent } from './student-subject-detail.component';

describe('StudentSubjectDetailComponent', () => {
  let component: StudentSubjectDetailComponent;
  let fixture: ComponentFixture<StudentSubjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSubjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
