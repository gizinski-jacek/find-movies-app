import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public $searchData = new Subject<Movie[] | null>();

  constructor() {}

  changeSearchData(data: Movie[] | null) {
    this.$searchData.next(data);
  }
}
