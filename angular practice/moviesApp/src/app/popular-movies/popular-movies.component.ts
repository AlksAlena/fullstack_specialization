import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {
  movies: Movie[];
  selectedMovie: Movie;
  
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movies = this.movieService.getPopularMovies();
  }

  onSelect(movie: Movie) {
    this.selectedMovie = movie;
  }

}
