/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterParamService } from './router-param.service';

describe('Service: RouterParam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterParamService]
    });
  });

  it('should ...', inject([RouterParamService], (service: RouterParamService) => {
    expect(service).toBeTruthy();
  }));
});
