import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCatalogComponent } from './components/movie-catalog/movie-catalog.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { TvShowCatalogComponent } from './components/tv-show-catalog/tv-show-catalog.component';
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details.component';

const routes: Routes = [
  { path: 'movie', component: MovieCatalogComponent },
  { path: 'movie/genre/:genre', component: MovieCatalogComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'tv', component: TvShowCatalogComponent },
  { path: 'tv/genre/:genre', component: TvShowCatalogComponent },
  { path: 'tv/:id', component: TvShowDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
