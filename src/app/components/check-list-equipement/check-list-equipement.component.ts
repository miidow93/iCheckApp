import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-check-list-equipement',
  templateUrl: './check-list-equipement.component.html',
  styleUrls: ['./check-list-equipement.component.scss'],
})
export class CheckListEquipementComponent implements OnInit {

  values = [];
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.values['b6'] = false;
    this.values['b7'] = false;
    this.values['b8'] = false;
    this.values['b9'] = false;
    this.values['b10'] = false;
    this.dataService.currentEquipementCheckList.subscribe();
    this.dataService.changeEquipementCheckList(this.values);
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
    this.dataService.changeEquipementCheckList(this.values);
  }

}
