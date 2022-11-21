import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie, TvShow } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  $movieSearchData = new Subject<Movie[] | null>();
  $tvShowSearchData = new Subject<TvShow[] | null>();

  constructor() {}

  changeMovieSearchData(data: Movie[] | null) {
    this.$movieSearchData.next(data);
  }

  changeTvShowSearchData(data: TvShow[] | null) {
    this.$tvShowSearchData.next(data);
  }
}
