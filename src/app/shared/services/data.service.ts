import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private enginDataSource = new BehaviorSubject<any[]>([]);
  currentEnginDataSource = this.enginDataSource.asObservable();

  private conducteurDataSource = new BehaviorSubject<any[]>([]);
  currentConducteurDataSource = this.conducteurDataSource.asObservable();

  constructor() { }

  changeEnginDataSource(data) {
    console.log('Engin Data Service: ', data);
    this.enginDataSource.next([...data]);
  }
  
  changeConducteurDataSource(data) {
    console.log('conducteur Data Service: ', data);
    this.conducteurDataSource.next([...data]);
  }
}
