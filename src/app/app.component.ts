import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/types/types';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchValue: string = '';
  searchCollection: Movie[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  searchMovie(query: string) {
    if (!query || query.length < 3) return;
    this.httpService.searchMovie(query).subscribe({
      next: (res) => (this.searchCollection = res.results),
      error: (err) => console.log(err),
    });
  }
}
