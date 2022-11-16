import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Movie } from 'src/types/types';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  id: string | undefined;
  movie: Movie | undefined;

  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.http.getMovieDetails(id).subscribe({
        next: (res) => (this.movie = res),
        error: (err) => console.log(err),
      });
    });
  }
}
