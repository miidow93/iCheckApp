import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculeService } from 'src/app/core/services/vehicule/vehicule.service';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EditVehiculeComponent } from '../edit-vehicule/edit-vehicule.component';
import { Constants } from 'src/app/shared/constants';
import { take } from 'rxjs/operators';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.scss'],
})
export class ListVehiculeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['camion', 'matricule', 'date', 'image', 'action'];
  dataSource = new MatTableDataSource();
  data = [];
  oldDataSource;
  faEdit = faEdit;

  constructor(private vehiculeService: VehiculeService, private route: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.vehiculeService.getAll().subscribe((res: any) => {
      console.log('res : ', res)
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.oldDataSource = this.dataSource.data;
      this.data = <any[]>this.dataSource.data;
    })
  }
  navigateTo() {
    this.route.navigate(['admin', { outlets: { admin: 'vehicule/new' } }]);
  }

  onEdit(element) {
    console.log(element);
    /*const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = '80%';*/
    this.dialog.open(EditVehiculeComponent, {
      data: { vehicule: element },
      disableClose: true,
      autoFocus: true,
      width: '80%'
    }).afterClosed().subscribe((res) => {
      console.log('Close: ', res);
      this.refresh();
    });
  }

  createImagePath(serverPath: string) {
    return `${Constants.serverImg}${serverPath}`;
    // return `http://localhost:4772/${serverPath}`;
  }

  async refresh() {
    await this.vehiculeService.getAll().pipe(take(1)).toPromise().then((response: any) => {
      console.log('Response Refresh: ', response);
      this.dataSource.data = response;
      this.dataSource.paginator = this.paginator;
      this.oldDataSource = this.dataSource.data;
      this.data = <any[]>this.dataSource.data;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
