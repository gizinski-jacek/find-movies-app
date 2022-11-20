import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, Genre, APIResponse, MovieDetails } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private endpoint = environment.tmdbEndpoint;

  constructor(private http: HttpClient) {}

  getRandomCollection(type: string): Observable<APIResponse<Movie>> {
    return this.http.get<APIResponse<Movie>>(
      `${this.endpoint}/discover/${type}`
    );
  }

  searchForCollection(
    type: string,
    query: string
  ): Observable<APIResponse<Movie>> {
    const params = new HttpParams({ fromString: `query=${query}` });
    return this.http.get<APIResponse<Movie>>(
      `${this.endpoint}/search/${type}`,
      { params: params }
    );
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.endpoint}/movie/${id}`, {});
  }

  getMovieGenres(): Observable<APIResponse<Genre>> {
    return this.http.get<APIResponse<Genre>>(
      `${this.endpoint}/genre/movie/list`
    );
  }

  getGenreCollection(
    type: string,
    genre: string
  ): Observable<APIResponse<Movie>> {
    const params = new HttpParams({ fromString: `with_genres=${genre}` });
    return this.http.get<APIResponse<Movie>>(
      `${this.endpoint}/discover/${type}`,
      { params: params }
    );
  }
}
