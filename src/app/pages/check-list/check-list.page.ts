import { Component, OnInit } from '@angular/core';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';
import { Conducteur } from 'src/app/shared/models/conducteur';
import { Constants } from 'src/app/shared/constants';
import { EnginService } from 'src/app/core/services/engin/engin.service';
import { Engin } from 'src/app/shared/models/engin';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.page.html',
  styleUrls: ['./check-list.page.scss'],
})
export class CheckListPage implements OnInit {

  conducteur: Conducteur;
  engins: Engin[];
  constructor(private checkListService: CheckListService, private enginService: EnginService) { }

  ngOnInit() {
    this.enginService.getEngins().subscribe(res => { this.engins = res; console.log(res); });
  }

  createImagePath(serverPath: string) {
    return `${Constants.serverImg}${serverPath}`;
    // return `http://localhost:4772/${serverPath}`;
  }

  onClick(nomEngin, id) {
    console.log(nomEngin, id);
  }
}
