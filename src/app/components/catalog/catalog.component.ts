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
  subscriptions: Subscription[] = [];

  constructor(
    private httpService: HttpService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ type, genre }) => {
      if (!genre) {
        const subscription = this.httpService
          .getRandomCollection(type)
          .subscribe({
            next: (res) => {
              const random = res.results.slice(0, 8);
              console.log(random);
              this.collection = random;
            },
            error: (err) => console.log(err),
          });
        this.subscriptions.push(subscription);
      } else {
        const subscription = this.httpService
          .getGenreCollection(type, genre)
          .subscribe({
            next: (res) => {
              const random = res.results.slice(0, 8);
              this.collection = random;
            },
            error: (err) => console.log(err),
          });
        this.subscriptions.push(subscription);
      }
    });
    const searchSubscription = this.searchService.$searchData.subscribe(
      (data) => (this.searchCollection = data)
    );
    this.subscriptions.push(searchSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
