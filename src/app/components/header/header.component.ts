import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Find Movies';
  attribution: string = 'Powered By <TMDB Logo Here>';
  search: string = '';
  timeout: any = null;
  @Output() inputOnChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onChange() {
    if (!this.search || this.search.length < 3) return;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.inputOnChange.emit(this.search);
    }, 500);
  }
}
