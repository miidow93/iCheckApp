import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/shared/constants';

const API = Constants.api + 'sites/'
@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http:HttpClient) { }
  getSites(){
    return this.http.get(`${API}`);
  }

  getAllSites() {
    return this.http.get(`${API}all`);
  }

  postSite(data){
    return this.http.post(`${API}`,data);
  }
}
