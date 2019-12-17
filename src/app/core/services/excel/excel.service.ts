import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/shared/constants';

const API = Constants.api + 'excel/download/';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http:HttpClient) { }
  exportToExcel(date) {
    return this.http.get(`${API}${date.startDate}/${date.endDate}`, {responseType: 'blob'});
  }
}
