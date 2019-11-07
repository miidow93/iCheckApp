import { Component, OnInit, ViewChild } from '@angular/core';
import { BloquageService } from 'src/app/core/services/blockage/bloquage.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  displayedColumns:string[]=['id','vehicule','dateBlockage','motif','dateDeblockage','imageUrl'];
  dataSource = new MatTableDataSource();

  constructor(private blockageService: BloquageService,private blockageDataService:DataService) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.getBlockage()
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getBlockage(){
    this.blockageService.getBolckedEngins().subscribe((res: any[])=> {
      this.blockageDataService.changeBlockageDataSource(res);
  });
  this.blockageDataService.currentBlockageDataSource.subscribe(data => {this.dataSource.data = data;this.dataSource.paginator = this.paginator})
}
}

