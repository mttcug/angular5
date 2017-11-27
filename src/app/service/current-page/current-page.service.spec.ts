import { TestBed, inject } from '@angular/core/testing';

import { CurrentPageService } from './current-page.service';

describe('CurrentPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentPageService]
    });
  });

  it('should be created', inject([CurrentPageService], (service: CurrentPageService) => {
    expect(service).toBeTruthy();
  }));
});
