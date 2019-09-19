import { Component, OnInit } from '@angular/core';
import { CheckListService } from 'src/app/core/services/check-list.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.page.html',
  styleUrls: ['./check-list.page.scss'],
})
export class CheckListPage implements OnInit {

  constructor(private checkListService: CheckListService) { }

  ngOnInit() {
    this.checkListService.getAllCheckList().subscribe(res => console.log(res[2].type.type));
  }

}
