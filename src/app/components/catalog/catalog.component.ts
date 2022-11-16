import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Movie } from 'src/types/types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  collection: Movie[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getRandomMovies().subscribe({
      next: (res) => {
        const random = res.results.slice(0, 8);
        this.collection = random;
      },
      error: (err) => console.log(err),
    });
  }
}
