import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SearchService } from 'src/app/services/search.service';
import { TvShow } from 'src/types/types';

@Component({
  selector: 'app-tv-show-catalog',
  templateUrl: './tv-show-catalog.component.html',
  styleUrls: ['./tv-show-catalog.component.scss'],
})
export class TvShowCatalogComponent implements OnInit {
  collection: TvShow[] = [];
  searchCollection: TvShow[] | null = null;
  subs: Subscription[] = [];

  constructor(
    private httpService: HttpService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ genre }) => {
      const sub = this.httpService.getRandomTvShows(genre).subscribe((res) => {
        const random = res['results'].slice(0, 8);
        this.collection = random;
      });
      this.subs.push(sub);
    });
    const searchSub = this.searchService.$tvShowSearchData.subscribe(
      (data) => (this.searchCollection = data)
    );
    this.subs.push(searchSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
