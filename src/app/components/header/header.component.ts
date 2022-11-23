import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { RouterParamsService } from 'src/app/services/router-params.service';
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
  currentParams: { type: string; id: string; genre: string } = {
    type: '',
    id: '',
    genre: '',
  };

  constructor(
    private http: HttpService,
    private searchService: SearchService,
    private paramsService: RouterParamsService
  ) {}

  ngOnInit(): void {
    const movieGenresSub = this.http
      .getMovieGenres()
      .subscribe((res) => (this.movieGenres = res['genres']));
    const tvShowGenresSub = this.http
      .getTvShowGenres()
      .subscribe((res) => (this.tvShowGenres = res['genres']));
    const paramsSub = this.paramsService.params$.subscribe(
      ({ type, id, genre }) => {
        this.searchMovieCollection = null;
        this.searchTvShowCollection = null;
        this.searchValue = '';
        this.currentParams = { type, id, genre };
        if (type === 'movie') {
          this.movieGenreId = genre ? parseInt(genre) : null;
          this.tvShowGenreId = null;
          this.placeholder = 'Search for a Movie';
        } else if (type === 'tv') {
          this.tvShowGenreId = genre ? parseInt(genre) : null;
          this.movieGenreId = null;
          this.placeholder = 'Search for a Tv Show';
        }
      }
    );
    this.subs.push(movieGenresSub, tvShowGenresSub, paramsSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  onChange() {
    if (!this.searchValue) {
      this.searchService.changeMovieSearchData(null);
      this.searchService.changeTvShowSearchData(null);
      return;
    }

    if (this.searchValue.length < 3) {
      return;
    }

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const { type, id, genre } = this.currentParams;
      if (type === 'movie') {
        const sub = this.http
          .searchForMovie(this.searchValue)
          .subscribe((res) => {
            if (!id || id === 'genre') {
              this.searchService.changeMovieSearchData(res['results']);
            } else {
              this.searchMovieCollection = res['results'];
              this.searchTvShowCollection = null;
            }
          });
        this.subs.push(sub);
      } else if (type === 'tv') {
        const sub = this.http
          .searchForTvShow(this.searchValue)
          .subscribe((res) => {
            if (!id || id === 'genre') {
              this.searchService.changeTvShowSearchData(res['results']);
            } else {
              this.searchTvShowCollection = res['results'];
              this.searchMovieCollection = null;
            }
          });
        this.subs.push(sub);
      }
    }, 500);
  }

  resetInput() {
    this.searchValue = '';
    this.searchService.changeMovieSearchData(null);
    this.searchService.changeTvShowSearchData(null);
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
