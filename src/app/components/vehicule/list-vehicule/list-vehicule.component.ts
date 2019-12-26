import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculeService } from 'src/app/core/services/vehicule/vehicule.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.scss'],
})
export class ListVehiculeComponent implements OnInit {
  displayedColumns : string [] = ['camion','matricule','date','image'];
  dataSource = new MatTableDataSource();
  data = [];
  oldDataSource;
  constructor(private vehiculeService:VehiculeService,private route: Router) { }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  ngOnInit() {
    this.getAll();
    }

  getAll(){
    this.vehiculeService.getAll().subscribe((res : any)=>{
      // console.log('res : ',res)
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.oldDataSource = this.dataSource.data;
      this.data = <any[]>this.dataSource.data;
    })
  }
  navigateTo(){
    this.route.navigate(['admin', { outlets: { admin: 'vehicule/new' } }]);
  }
}
