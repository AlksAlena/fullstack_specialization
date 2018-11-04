import { Injectable } from '@angular/core';
import { Movie } from '../shared/movie';
import { MOVIES } from '../shared/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getPopularMovies(): Movie[] {
    return MOVIES;
  }

  getFavoritesMovies(): Movie[] {
    return MOVIES;
  }

  addFavoritesMovies(id: number): void {
    console.log('Movie is successful added!')
  }

  deleteFavoritesMovies(id: number): void {
    console.log('Movie is successful deleted!')
  }
}
