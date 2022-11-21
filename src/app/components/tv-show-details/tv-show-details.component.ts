import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { TvShowDetails } from 'src/types/types';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss'],
})
export class TvShowDetailsComponent implements OnInit {
  id: string | undefined;
  tvShow: TvShowDetails | undefined;
  subscriptions: Subscription[] = [];

  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const sub = this.route.params.subscribe(({ id }) => {
      this.getDetails(id);
    });
    this.subscriptions.push(sub);
  }

  getDetails(id: string): void {
    const sub = this.http.getTvShowDetails(id).subscribe((res) => {
      this.tvShow = res;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
