import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { UserService } from 'src/app/core/services/user/user.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {


  displayedColumns: string[] = ['nomcomplet', 'username', 'role', 'site','action'];
  dataSource = new MatTableDataSource();
  searchKey: string;
  faEdit = faEdit;

  constructor(private service: UserService,
    private userDataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dataService:DataService) { }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.refresh();
    this.dataService.currentUserDataSource.subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
    })
  }


  async refresh() {
    await this.service.getAllUser().pipe(take(1)).toPromise().then((response: any) => {
      console.log('Response Refresh: ', response);
      this.dataSource.data = response;
      this.dataSource.paginator = this.paginator;
      /*this.oldDataSource = this.dataSource.data;
      this.data = <any[]>this.dataSource.data;*/
    });
  }

  navigateTo() {
    this.route.navigate(['admin', { outlets: { admin: 'user/new' } }]);
  }

  onEdit(element) {
    console.log(element);
    /*const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = '80%';*/
    this.dialog.open(EditUserComponent, {
      data: { user: element },
      disableClose: true,
      autoFocus: true,
      width: '80%'
    }).afterClosed().subscribe((res) => {
      console.log('Close: ', res);
      this.refresh();
    });
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
