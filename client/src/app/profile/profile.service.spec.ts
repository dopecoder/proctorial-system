import { TestBed, inject } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ClassroomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService]
    });
  });

  it('should ...', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});