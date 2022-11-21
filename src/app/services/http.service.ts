import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Movie,
  APIResponse,
  MovieDetails,
  TvShow,
  Genre,
  TvShowDetails,
} from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private endpoint = environment.tmdbEndpoint;

  constructor(private http: HttpClient) {}

  getMovieGenres(): Observable<APIResponse<Genre>> {
    return this.http.get<APIResponse<Genre>>(
      `${this.endpoint}/genre/movie/list`
    );
  }

  getTvShowGenres(): Observable<APIResponse<Genre>> {
    return this.http.get<APIResponse<Genre>>(`${this.endpoint}/genre/tv/list`);
  }

  getRandomMovies(genre?: string): Observable<APIResponse<Movie>> {
    const params = genre
      ? new HttpParams({ fromString: `with_genres=${genre}` })
      : {};
    return this.http.get<APIResponse<Movie>>(
      `${this.endpoint}/discover/movie`,
      { params: params }
    );
  }

  getRandomTvShows(genre?: string): Observable<APIResponse<TvShow>> {
    const params = genre
      ? new HttpParams({ fromString: `with_genres=${genre}` })
      : {};
    return this.http.get<APIResponse<TvShow>>(`${this.endpoint}/discover/tv`, {
      params: params,
    });
  }

  getMovieGenreCollection(genre: string): Observable<APIResponse<Movie>> {
    const params = new HttpParams({ fromString: `with_genres=${genre}` });
    return this.http.get<APIResponse<Movie>>(
      `${this.endpoint}/discover/movie`,
      { params: params }
    );
  }

  getTvShowGenreCollection(genre: string): Observable<APIResponse<TvShow>> {
    const params = new HttpParams({ fromString: `with_genres=${genre}` });
    return this.http.get<APIResponse<TvShow>>(`${this.endpoint}/discover/tv`, {
      params: params,
    });
  }

  searchForMovie(query: string): Observable<APIResponse<Movie>> {
    const params = new HttpParams({ fromString: `query=${query}` });
    return this.http.get<APIResponse<Movie>>(`${this.endpoint}/search/movie`, {
      params: params,
    });
  }

  searchForTvShow(query: string): Observable<APIResponse<TvShow>> {
    const params = new HttpParams({ fromString: `query=${query}` });
    return this.http.get<APIResponse<TvShow>>(`${this.endpoint}/search/tv`, {
      params: params,
    });
  }

  // multiSearch(query: string): Observable<APIResponse<Movie & TvShow>> {
  //   const params = new HttpParams({ fromString: `query=${query}` });
  //   return this.http.get<APIResponse<Movie & TvShow>>(
  //     `${this.endpoint}/search/multi`,
  //     { params: params }
  //   );
  // }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.endpoint}/movie/${id}`, {});
  }

  getTvShowDetails(id: string): Observable<TvShowDetails> {
    return this.http.get<TvShowDetails>(`${this.endpoint}/tv/${id}`, {});
  }
}
