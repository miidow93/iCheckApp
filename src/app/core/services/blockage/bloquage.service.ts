import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class BloquageService {

  constructor(private http: HttpClient) { }

  getBolckedEngins() {
    return this.http.get(`${Constants.api}blockages`);
  }
}
