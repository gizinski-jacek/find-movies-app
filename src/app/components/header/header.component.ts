import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { RouterParamService } from 'src/app/services/router-param.service';
import { SearchService } from 'src/app/services/search.service';
import { Genre, Movie, TvShow } from 'src/types/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  attribution: string = 'Powered By';
  timeout: any = null;
  searchValue: string = '';
  searchMovieCollection: Movie[] | null = null;
  searchTvShowCollection: TvShow[] | null = null;
  inputFocus: boolean = false;
  renderResults: boolean = false;
  movieGenres: Genre[] = [];
  movieGenreId: number | null = null;
  tvShowGenres: Genre[] = [];
  tvShowGenreId: number | null = null;
  placeholder: string = '';
  subs: Subscription[] = [];

  constructor(
    private http: HttpService,
    private searchService: SearchService,
    private params: RouterParamService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const movieGenresSub = this.http
      .getMovieGenres()
      .subscribe((res) => (this.movieGenres = res['genres']));
    const tvShowGenresSub = this.http
      .getTvShowGenres()
      .subscribe((res) => (this.tvShowGenres = res['genres']));
    const paramsSub = this.params.params$.subscribe(({ genre }) => {
      const path = this.location.path().split('/')[1];
      if (path === 'movie') {
        this.movieGenreId = genre ? parseInt(genre) : null;
        this.tvShowGenreId = null;
        this.placeholder = 'Search for a Movie';
      } else if (path === 'tv') {
        this.tvShowGenreId = genre ? parseInt(genre) : null;
        this.movieGenreId = null;
        this.placeholder = 'Search for a Tv Show';
      }
    });
    this.subs.push(movieGenresSub, tvShowGenresSub, paramsSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  onChange() {
    if (!this.searchValue) {
      this.searchService.changeMovieSearchData(null);
      return;
    }

    if (this.searchValue.length < 3) {
      return;
    }

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const paramsSub = this.params.params$.subscribe(({ id }) => {
        const path = this.location.path();
        if (path === '/movie') {
          const sub = this.http
            .searchForMovie(this.searchValue)
            .subscribe((res) => {
              if (!id) {
                this.searchService.changeMovieSearchData(res['results']);
              } else {
                this.searchMovieCollection = res['results'];
                this.searchTvShowCollection = null;
              }
            });
          this.subs.push(sub);
        } else if (path === '/tv') {
          const sub = this.http
            .searchForTvShow(this.searchValue)
            .subscribe((res) => {
              if (!id) {
                console.log(res);
                this.searchService.changeTvShowSearchData(res['results']);
              } else {
                this.searchTvShowCollection = res['results'];
                this.searchMovieCollection = null;
              }
            });
          this.subs.push(sub);
        }
      });
      this.subs.push(paramsSub);
    }, 500);
  }

  resetInput() {
    this.searchValue = '';
    this.searchService.changeMovieSearchData(null);
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
