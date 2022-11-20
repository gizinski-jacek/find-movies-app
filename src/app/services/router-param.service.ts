import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class RouterParamService {
  params$: Observable<{ [key: string]: string }>;

  constructor(
    private readonly router: Router,
    private readonly rootRoute: ActivatedRoute
  ) {
    this.params$ = router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => this.getParams(this.rootRoute))
    );
  }
  paramsSnapshot() {
    return this.getParams(this.rootRoute);
  }

  private getParams(route: ActivatedRoute) {
    // route param names (eg /a/:personId) must be ditinct within
    // a route otherwise they'll be overwritten
    let params = route.snapshot.params;
    params = { ...route.snapshot.queryParams, ...params };
    if (route.children) {
      for (let r of route.children) {
        params = { ...this.getParams(r), ...params };
      }
    }
    return params;
  }
}
