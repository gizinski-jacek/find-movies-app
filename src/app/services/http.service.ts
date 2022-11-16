import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Movie } from 'src/types/types';

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

  getRandomMovies(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.url}/discover/movie`, {
      headers: this.headers,
    });
  }

  searchMovie(query: string): Observable<ApiResponse> {
    const params = new HttpParams({ fromString: `query=${query}` });
    return this.http.get<ApiResponse>(`${this.url}/search/movie`, {
      headers: this.headers,
      params: params,
    });
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/movie/${id}`, {
      headers: this.headers,
    });
  }
}
