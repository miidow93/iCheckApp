import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CheckListRefService } from 'src/app/core/services/checkListRef/check-list-ref.service';

@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.scss'],
})
export class SyntheseComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'date', 'conducteur', 'vehicule', 'engin', 'detail'];
  dataSource = new MatTableDataSource();

  constructor(private checkListRefService: CheckListRefService) { }

  ngOnInit() {
    this.checkListRefService.getAllCheckListRef().subscribe((res: any)   => {
      console.log(res);
      this.dataSource.data = res;
    });
  }

}
