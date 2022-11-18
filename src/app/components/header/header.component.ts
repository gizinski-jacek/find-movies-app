import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SearchService } from 'src/app/services/search.service';
import { Genre, Movie } from 'src/types/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  attribution: string = 'Powered By <TMDB Logo Here>';
  timeout: any = null;
  searchValue: string = '';
  searchCollection: Movie[] | null = null;
  inputFocus: boolean = false;
  renderResults: boolean = false;
  genres: Genre[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private http: HttpService,
    private location: Location,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    const movieGenresSubscription = this.http
      .getMovieGenres()
      .subscribe({ next: (res) => (this.genres = res.genres) });
    this.subscriptions.push(movieGenresSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onChange() {
    if (!this.searchValue) {
      this.searchService.changeSearchData(null);
      return;
    }
    if (this.searchValue.length < 3) {
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const path = this.location.path().split('?')[0].replace('/', '');
      const subscription = this.http
        .searchForCollection(path, this.searchValue)
        .subscribe({
          next: (res) => {
            if (path === 'movie') {
              this.searchService.changeSearchData(res.results);
            } else {
              this.searchCollection = res.results;
            }
          },
          error: (err) => console.log(err),
        });
      this.subscriptions.push(subscription);
    }, 500);
  }

  resetInput() {
    this.searchValue = '';
    this.searchService.changeSearchData(null);
  }

  onFocus() {
    this.inputFocus = true;
  }

  onFocusout() {
    this.inputFocus = false;
  }

  showResults() {
    this.renderResults = true;
  }

  hideResults() {
    this.renderResults = false;
  }
}
