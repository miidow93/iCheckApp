import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-check-list-engin',
  templateUrl: './check-list-engin.component.html',
  styleUrls: ['./check-list-engin.component.scss'],
})
export class CheckListEnginComponent implements OnInit {

  values = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.values['b11'] = false;
    this.values['b12'] = false;
    this.values['b13'] = false;
    this.values['b14'] = false;
    this.values['b15'] = false;
    this.values['b16'] = false;
    this.values['b17'] = false;
    this.values['b18'] = false;
    this.values['b19'] = false;
    this.values['b20'] = false;
    this.values['b21'] = false;
    this.values['b22'] = false;
    this.dataService.currentEnginCheckList.subscribe();
    this.dataService.changeEnginCheckList(this.values);
  }

  check(id) {
    console.log(id);
    const buttonID = `b${id}`;
    const button = document.getElementById(buttonID);
    // console.log(button.classList);
    if (button.classList.contains('isNotActive')) {
      button.classList.replace('isNotActive', 'isActive');
      this.values[`${buttonID}`] = true;

    } else {
      if (button.classList.contains('isActive')) {
        button.classList.replace('isActive', 'isNotActive');
        this.values[`${buttonID}`] = false;
      }
    }
    this.dataService.changeEnginCheckList(this.values);
  }

}
