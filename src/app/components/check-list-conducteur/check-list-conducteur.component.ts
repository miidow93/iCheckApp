import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-check-list-conducteur',
  templateUrl: './check-list-conducteur.component.html',
  styleUrls: ['./check-list-conducteur.component.scss'],
})
export class CheckListConducteurComponent implements OnInit {

  values = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.values['b1'] = false;
    this.values['b2'] = false;
    this.values['b3'] = false;
    this.values['b4'] = false;
    this.values['b5'] = false;
    this.dataService.currentConducteurCheckList.subscribe();
    this.dataService.changeConducteurCheckList(this.values);
  }

  test(id) {
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
    this.dataService.changeConducteurCheckList(this.values);
  }
}
