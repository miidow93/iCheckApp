import { Component, OnInit } from '@angular/core';
import { BloquageService } from 'src/app/core/services/blockage/bloquage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  constructor(private blockageService: BloquageService) { }

  ngOnInit() {
    this.blockageService.getBolckedEngins().subscribe(res => console.log('History: ', res));
  }

}
