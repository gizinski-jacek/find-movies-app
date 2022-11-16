import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/types/types';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie | undefined;

  constructor() {}

  ngOnInit(): void {}
}
