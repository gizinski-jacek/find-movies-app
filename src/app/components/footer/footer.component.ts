import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  notice: string =
    'This product uses the TMDB API but is not endorsed or certified by TMDB';

  constructor() {}

  ngOnInit(): void {}
}
