/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterParamsService } from './router-params.service';

describe('Service: RouterParam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterParamsService],
    });
  });

  it('should ...', inject(
    [RouterParamsService],
    (service: RouterParamsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
