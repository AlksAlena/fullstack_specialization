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

  getPopularMovie(id: number): Movie {
    return MOVIES.filter((movie) => (movie.id === id))[0];
  }

  getFavoriteMovies(): Movie[] {
    let favoriteMoviesObject = this.downloadFromLocalStorage("favoriteMovies");
    let favoriteMoviesList = [];
    for (let key in favoriteMoviesObject) {
      favoriteMoviesList.push(favoriteMoviesObject[key]);   
    }
    return favoriteMoviesList;
  }

  addFavoriteMovie(id: number, movie: Movie): void {
    let favoriteMoviesObject = this.downloadFromLocalStorage("favoriteMovies");
    if (favoriteMoviesObject) {
      favoriteMoviesObject[id] = movie;
      this.uploadToLocalStorage("favoriteMovies", favoriteMoviesObject);
    } else {
      let newFavoriteMoviesList = {};
      newFavoriteMoviesList[id] = movie;
      this.uploadToLocalStorage("favoriteMovies", newFavoriteMoviesList);
    }
  }

  deleteFavoriteMovie(id: number): void {
    let favoriteMoviesObject = this.downloadFromLocalStorage("favoriteMovies");
    let key = id.toString();
    if (key in favoriteMoviesObject) {
      delete favoriteMoviesObject[key];
      this.uploadToLocalStorage("favoriteMovies", favoriteMoviesObject);
    }
  }

  downloadFromLocalStorage(key) {
    let value = JSON.parse(localStorage.getItem(key))
    return value;
  }

  uploadToLocalStorage(key, value) {
    let serialValue = JSON.stringify(value);
    localStorage.setItem(key, serialValue);
  }
}

 