import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SearchService } from 'src/app/services/search.service';
import { Movie } from 'src/types/types';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.scss'],
})
export class MovieCatalogComponent implements OnInit {
  loading: boolean = true;
  collection: Movie[] = [];
  searchCollection: Movie[] | null = null;
  subs: Subscription[] = [];

  constructor(
    private httpService: HttpService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ genre }) => {
      const sub = this.httpService.getRandomMovies(genre).subscribe((res) => {
        const random = res['results'].slice(0, 8);
        this.collection = random;
        this.loading = false;
      });
      this.subs.push(sub);
    });
    const searchSub = this.searchService.$movieSearchData.subscribe(
      (data) => (this.searchCollection = data)
    );
    this.subs.push(searchSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
