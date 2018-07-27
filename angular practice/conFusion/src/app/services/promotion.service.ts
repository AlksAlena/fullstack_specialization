import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    // return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }

  getPromotion(id: number): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  } 
  
  getFeaturedPromotion(): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promo) => (promo.featured))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]));
  } 
}
