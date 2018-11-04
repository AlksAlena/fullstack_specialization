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

  getFavoriteMovies(): Movie[] {
    return MOVIES;
  }

  addFavoriteMovies(id: number): void {
    console.log('Movie is successful added!')
  }

  deleteFavoriteMovies(id: number): void {
    console.log('Movie is successful deleted!')
  }
}
