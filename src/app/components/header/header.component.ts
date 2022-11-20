import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { RouterParamService } from 'src/app/services/router-param.service';
import { SearchService } from 'src/app/services/search.service';
import { Genre, Movie } from 'src/types/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  attribution: string = 'Powered By';
  timeout: any = null;
  searchValue: string = '';
  searchCollection: Movie[] | null = null;
  inputFocus: boolean = false;
  renderResults: boolean = false;
  genres: Genre[] = [];
  genreId: number | null = null;
  subs: Subscription[] = [];

  constructor(
    private http: HttpService,
    private searchService: SearchService,
    public params: RouterParamService
  ) {}

  ngOnInit(): void {
    const movieGenresSub = this.http
      .getMovieGenres()
      .subscribe((res) => (this.genres = res['genres']));
    const paramsSub = this.params.params$.subscribe(({ genre }) => {
      if (genre) {
        this.genreId = parseInt(genre);
      } else {
        this.genreId = null;
      }
    });
    this.subs.push(movieGenresSub, paramsSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
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
      this.params.params$.subscribe(({ type, id }) => {
        const sub = this.http
          .searchForCollection(type, this.searchValue)
          .subscribe((res) => {
            if (id) {
              this.searchService.changeSearchData(res['results']);
            } else {
              this.searchCollection = res['results'];
            }
          });
        this.subs.push(sub);
      });
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
