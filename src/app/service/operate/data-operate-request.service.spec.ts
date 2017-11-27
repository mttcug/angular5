import { TestBed, inject } from '@angular/core/testing';

import { DataOperateRequestService } from './data-operate-request.service';

describe('DataOperateRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataOperateRequestService]
    });
  });

  it('should be created', inject([DataOperateRequestService], (service: DataOperateRequestService) => {
    expect(service).toBeTruthy();
  }));
});
