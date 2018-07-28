import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getDishes(): Observable<Dish[]> {
    // return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    // return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

  getDishIds(): Observable<number[] | any> {
    // return of(DISHES.map(dish => dish.id));
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
}
