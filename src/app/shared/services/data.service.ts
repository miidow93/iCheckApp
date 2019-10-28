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

  private conducteurCheckList = new BehaviorSubject<any[]>([]);
  currentConducteurCheckList = this.conducteurCheckList.asObservable();

  private enginCheckList = new BehaviorSubject<any[]>([]);
  currentEnginCheckList = this.enginCheckList.asObservable();

  private equipementCheckList = new BehaviorSubject<any[]>([]);
  currentEquipementCheckList = this.equipementCheckList.asObservable();


  constructor() { }

  changeEnginDataSource(data) {
    console.log('Engin Data Service: ', data);
    this.enginDataSource.next([...data]);
  }
  
  changeConducteurDataSource(data) {
    console.log('conducteur Data Service: ', data);
    this.conducteurDataSource.next([...data]);
  }

  changeConducteurCheckList(data) {
    console.log('Conducteur CheckList: ', data);
    this.conducteurCheckList.next(data);
  }

  changeEnginCheckList(data) {
    console.log('Engin CheckList: ', data);
    this.enginCheckList.next(data);
  }

  changeEquipementCheckList(data) {
    console.log('Equipement CheckList: ', data);
    this.equipementCheckList.next(data);
  }
}
