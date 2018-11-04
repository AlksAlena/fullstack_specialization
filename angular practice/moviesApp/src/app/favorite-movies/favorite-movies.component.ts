import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  movies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movies = this.movieService.getFavoriteMovies();
  }

}
