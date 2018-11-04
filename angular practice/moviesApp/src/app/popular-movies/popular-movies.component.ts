import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie';
import { MOVIES } from '../shared/movies';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {
  movies: Movie[] = MOVIES;
  //selectedMovie = MOVIES[0];
  
  constructor() { }

  ngOnInit() {
  }

}
