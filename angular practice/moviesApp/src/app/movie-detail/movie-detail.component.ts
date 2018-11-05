import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  id: number;
  movie: Movie;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.movie = this.movieService.getPopularMovie(this.id);
  }

  addFavoriteMovie(id: number, movie: Movie): void {
    this.movieService.addFavoriteMovie(id, movie);
  }

  deleteFavoriteMovie(id: number): void {
    this.movieService.deleteFavoriteMovie(id);
  }

  goBack(): void {
    this.location.back();
  }

}
