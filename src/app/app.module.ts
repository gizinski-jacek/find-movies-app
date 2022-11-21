import { KeyValueDiffers, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { RouterParamService } from './services/router-param.service';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieCatalogComponent } from './components/movie-catalog/movie-catalog.component';
import { TvShowCatalogComponent } from './components/tv-show-catalog/tv-show-catalog.component';
import { TvShowItemComponent } from './components/tv-show-item/tv-show-item.component';
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieCatalogComponent,
    MovieItemComponent,
    MovieDetailsComponent,
    TvShowCatalogComponent,
    TvShowItemComponent,
    TvShowDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    RouterParamService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
