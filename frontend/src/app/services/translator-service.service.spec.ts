import { TestBed } from '@angular/core/testing';

import { TranslatorService } from './translator-service.service';

describe('TranslatorServiceService', () => {
  let service: TranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
