import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from 'src/app/core/services/user/user.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {


  displayedColumns: string[] = ['nomcomplet', 'username', 'role', 'site'];
  dataSource = new MatTableDataSource();
  searchKey: string;
  constructor(private service: UserService,
    private userDataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.refresh();
  }

  // Recuperation de la liste des conducteurs
  refresh() {
    this.service.getAllUser().subscribe((res: any[]) => {
      console.log('all Users:', res)
      this.userDataService.changeUserDataSource(res);
    });
    this.userDataService.currentUserDataSource.subscribe(data => { this.dataSource.data = data; this.dataSource.paginator = this.paginator });
  }

  navigateTo(url) {
    console.log('Url: ', url);
    this.route.navigate(['admin', { outlets: { admin: 'user/new' } }]);
  }

}
