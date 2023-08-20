import { TestBed } from '@angular/core/testing';

import { UpdateDBService } from './update-db.service';

describe('UpdateDBService', () => {
  let service: UpdateDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
