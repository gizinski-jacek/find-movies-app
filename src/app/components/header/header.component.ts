import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { SearchService } from 'src/app/services/search.service';
import { Movie } from 'src/types/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Find Movies';
  attribution: string = 'Powered By <TMDB Logo Here>';
  timeout: any = null;
  searchValue: string = '';
  searchCollection: Movie[] = [];
  inputFocus: boolean = false;
  renderResults: boolean = false;

  constructor(
    private http: HttpService,
    private location: Location,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {}

  onChange() {
    if (!this.searchValue || this.searchValue.length < 3) return;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.http.searchMovie(this.searchValue).subscribe({
        next: (res) => {
          if (this.location.path() === '') {
            this.searchService.changeSearchData(res.results);
          } else {
            this.searchCollection = res.results;
          }
        },
        error: (err) => console.log(err),
      });
    }, 500);
  }

  resetInput() {
    this.searchValue = '';
    this.searchService.changeSearchData([]);
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
