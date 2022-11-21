import { Component, Input, OnInit } from '@angular/core';
import { TvShow } from 'src/types/types';

@Component({
  selector: 'app-tv-show-item',
  templateUrl: './tv-show-item.component.html',
  styleUrls: ['./tv-show-item.component.scss'],
})
export class TvShowItemComponent implements OnInit {
  @Input() tvShow: TvShow | undefined;

  constructor() {}

  ngOnInit(): void {}
}
