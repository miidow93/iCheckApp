import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Engin } from 'src/app/shared/models/engin';
import { Constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class EnginService {

  constructor(private http: HttpClient) { }

  getEngins(): Observable<Engin[]> {
    return this.http.get<Engin[]>(`${Constants.api}engins`);
  }
}
