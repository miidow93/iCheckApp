import { Injectable } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const API = Constants.api + 'stats/';
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http:HttpClient) { }

  getStatsByMonth() {
    return this.http.get(`${API}synthese/total`)
    .pipe(
      tap(_ => this.log('stats by month')),
      catchError(this.handleError('stats by month', []))
    );
  }

  getStatsBlockedByMonth(site) {
    return this.http.get(`${API}${site}`)
    .pipe(
      tap(_ => this.log('stats by month')),
      catchError(this.handleError('stats by month', []))
    );
  }

  getStats() {
    return this.http.get(`${API}`)
    .pipe(
      tap(_ => this.log('get all stats')),
      catchError(this.handleError('get all stats', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
  getStatusBysite(type){
    return this.http.get(`${API}suspendu/${type}`);
  }
  getNumberOfNotBlocked(){
    return this.http.get(`${API}Nonsuspendu`);
  }
  getNumberOfControled(){
    return this.http.get(`${API}controledSite`);
  }
  getControled(){
    return this.http.get(`${API}controled`);
  }
}
