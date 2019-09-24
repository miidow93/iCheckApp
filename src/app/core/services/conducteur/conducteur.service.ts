import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/shared/constants';

const API = Constants.api + 'conducteurs/';
@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  constructor(private http: HttpClient) { }
  getAllConducteur() {
    return this.http.get<any>(`${API}`);
  }
  AddConducteur(data) {
    return this.http.post(`${API}postev`, data);
  }
}
