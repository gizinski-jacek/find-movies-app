import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, Genre } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = environment.tmdbEndpoint;
  private key = environment.tmdbAPIKey;
  private headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.key}`,
  });

  constructor(private http: HttpClient) {}

  getRandomCollection(type: string): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(`${this.url}/discover/${type}`, {
      headers: this.headers,
    });
  }

  searchForCollection(
    type: string,
    query: string
  ): Observable<{ results: Movie[] }> {
    const params = new HttpParams({ fromString: `query=${query}` });
    return this.http.get<{ results: Movie[] }>(`${this.url}/search/${type}`, {
      headers: this.headers,
      params: params,
    });
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/movie/${id}`, {
      headers: this.headers,
    });
  }

  getMovieGenres(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(`${this.url}/genre/movie/list`, {
      headers: this.headers,
    });
  }

  getGenreCollection(
    type: string,
    genre: string
  ): Observable<{ results: Movie[] }> {
    const params = new HttpParams({ fromString: `with_genres=${genre}` });
    return this.http.get<{ results: Movie[] }>(`${this.url}/discover/${type}`, {
      headers: this.headers,
      params: params,
    });
  }
}
