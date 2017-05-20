import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomAnalyticsComponent } from './classroom-analytics.component';

describe('ClassroomAnalyticsComponent', () => {
  let component: ClassroomAnalyticsComponent;
  let fixture: ComponentFixture<ClassroomAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
