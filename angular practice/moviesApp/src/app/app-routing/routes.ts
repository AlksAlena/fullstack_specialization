import { Routes } from '@angular/router';

import { PopularMoviesComponent } from '../popular-movies/popular-movies.component';
import { FavoriteMoviesComponent } from '../favorite-movies/favorite-movies.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: 'home',  component: PopularMoviesComponent },
  { path: 'favorites',  component: FavoriteMoviesComponent },
  { path: 'moviedetail/:id', component: MovieDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];