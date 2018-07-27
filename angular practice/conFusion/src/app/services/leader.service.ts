import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leaders');
  }

  getLeader(id: number): Observable<Leader> {
    // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leaders/' + id);

  } 
  
  getFeaturedLeader(): Observable<Leader> {
    // return of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leaders?featured=true')
      .pipe(map(leaders => leaders[0]));;
  } 
}
