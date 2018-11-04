import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie';
import { MOVIES } from '../shared/movies';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  movies: Movie[] = MOVIES;
  //selectedMovie = MOVIES[0];

  constructor() { }

  ngOnInit() {
  }

}
