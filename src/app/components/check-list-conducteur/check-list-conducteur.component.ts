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
      const js = { key: buttonID, value: true };
      this.values[`${buttonID}`] = true;
      // if (!this.values.find(x => x.key === js.key)) {
      //   this.values.push(js);
      // }
      // console.log('Is Active: ', this.values);
    } else {
      if (button.classList.contains('isActive')) {
        button.classList.replace('isActive', 'isNotActive');
        const js = { key: buttonID, value: false };

        // if (this.values.find(x => x.key === js.key)) {
        //   this.values.push(js);
        // }
        this.values[`${buttonID}`] = false;
        // console.log('Is Not Active: ', this.values);
      }
    }
    this.dataService.changeConducteurCheckList(this.values);
  }
}
