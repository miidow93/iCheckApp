import { Injectable } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const API = Constants.api + 'stats/';
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

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
        /*map((s: any) => {
          const data = s.stats.map(d => {
            const data = { label: d.label, type: d.type };
            if (d.etat === 'blocked') {
              data['blockedCount'] = d.count;
            } else {
              data['notBlockedCount'] = d.count;
            }
            console.log('Map: ', data);
            return data;
          }).reduce((m, o) => {
            console.log('O: ', o);
            console.log('M: ', m);
            var found = m.find(p => p.label === o.label && p.type === o.type);
            // console.log('Found: ', found);
            if (found) {
              found.blockedCount = 0;
              found.notBlockedCount ? found.notBlockedCount : found.notBlockedCount + (o.notBlockedCount ? o.notBlockedCount : 0);
              found.blockedCount += o.blockedCount ? o.blockedCount : 0;
            } else {
              m.push(o);
            }
            return m;
          }, []);
          return data;
        }),*/
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

  getStatusBysite(type) {
    return this.http.get(`${API}suspendu/${type}`);
  }
  
  getNumberOfBlocked() {
    return this.http.get(`${API}suspendu`);
  }
  
  getNumberOfNotBlocked() {
    return this.http.get(`${API}Nonsuspendu`);
  }
  getNumberOfControled() {
    return this.http.get(`${API}controledSite`);
  }
  getControled() {
    return this.http.get(`${API}controled`);
  }
}
