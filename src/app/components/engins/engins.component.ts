import { Component, OnInit } from '@angular/core';
import { Conducteur } from 'src/app/shared/models/conducteur';
import { Engin } from 'src/app/shared/models/engin';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';
import { EnginService } from 'src/app/core/services/engin/engin.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-engins',
  templateUrl: './engins.component.html',
  styleUrls: ['./engins.component.scss'],
})
export class EnginsComponent implements OnInit {

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
