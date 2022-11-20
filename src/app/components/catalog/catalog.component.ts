import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SearchService } from 'src/app/services/search.service';
import { Movie } from 'src/types/types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  collection: Movie[] = [];
  searchCollection: Movie[] | null = null;
  subs: Subscription[] = [];

  constructor(
    private httpService: HttpService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ type, genre }) => {
      if (!genre) {
        const sub = this.httpService
          .getRandomCollection(type)
          .subscribe((res) => {
            const random = res['results'].slice(0, 8);
            this.collection = random;
          });
        this.subs.push(sub);
      } else {
        const sub = this.httpService
          .getGenreCollection(type, genre)
          .subscribe((res) => {
            const random = res['results'].slice(0, 8);
            this.collection = random;
          });
        this.subs.push(sub);
      }
    });
    const searchSub = this.searchService.$searchData.subscribe(
      (data) => (this.searchCollection = data)
    );
    this.subs.push(searchSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
