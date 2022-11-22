import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MovieDetails } from 'src/types/types';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  id: string | undefined;
  movie: MovieDetails | undefined;
  subscriptions: Subscription[] = [];

  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const sub = this.route.params.subscribe(({ id }) => {
      this.getDetails(id);
    });
    this.subscriptions.push(sub);
  }

  getDetails(id: string): void {
    const sub = this.http
      .getMovieDetails(id)
      .subscribe((res) => (this.movie = res));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
