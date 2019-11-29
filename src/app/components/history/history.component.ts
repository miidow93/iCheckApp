import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockageService } from 'src/app/core/services/blockage/blockage.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { faFilter, faSyncAlt, faBan, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'vehicule', 'dateBlockage', 'motif', 'dateDeblockage', 'imageUrl'];
  dataSource = new MatTableDataSource();
  dateEntree = new FormControl(moment());
  dateSortie = new FormControl(moment());
  faFilter = faFilter;
  faSyncAlt = faSyncAlt;
  faBan = faBan;
  faCircle = faCircle;
  data = [];
  de; ds;
  oldDataSource;
  constructor(private blockageService: BlockageService, private dataService: DataService) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.getBlockage()
  }
  ngAfterViewInit() {
    this.de = moment(this.dateEntree.value).format('YYYY-MM-DD') + 'T00:00:00';
    this.ds = moment(this.dateSortie.value).format('YYYY-MM-DD') + 'T00:00:00';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getBlockage() {
    this.blockageService.getBolckedEngins().subscribe((res: any[]) => {
      // this.dataService.changeBlockageDataSource(res);
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator
      this.oldDataSource = this.dataSource.data;
      this.data = <any[]>this.dataSource.data;
    });
    // this.dataService.currentBlockageDataSource.subscribe(data => { 
    //   this.dataSource.data = data; 
    //   this.dataSource.paginator = this.paginator
    //   this.oldDataSource = this.dataSource.data;
    //   this.data = <any[]>this.dataSource.data;
    //  })
    // this.blockageService.getBolckedEngins().subscribe((res: any) => {
    //   console.log('CheckListRefs: ', res);
    //   this.dataSource.data = res;
    //   this.dataSource.paginator = this.paginator;
    //   this.oldDataSource = this.dataSource.data;
    //   this.data = <any[]>this.dataSource.data;
    // });
  }
  onChange(term, event) {
    // console.log('Date: ', term.value);
    if (event === 'dateEntree') {
      this.de = this.validateDate(term);
      console.log('De: ', new Date(this.de) + ' ' + this.de);
    } else if (event === 'dateSortie') {
      this.ds = this.validateDate(term);
      console.log('Ds: ', new Date(this.ds) + ' ' + this.ds);
    }
  }
  validateDate(date) {
    let result = `${date.value._i.year}`;
    const validateMonth = `${date.value._i.month}`;
    const validateDay = `${date.value._i.date}`;
    console.log('Month: ', validateMonth + ', Day: ' + validateDay);
    const time = 'T00:00:00';
    if (Number(validateMonth) < 9 && Number(validateDay) < 10) {
      result += `-0${Number(validateMonth) + 1}-0${validateDay}${time}`;
    } else {
      if (Number(validateMonth) >= 9) {
        result += `-${Number(validateMonth) + 1}`;
      } else {
        result += `-0${Number(validateMonth) + 1}`;
      }

      if (Number(validateDay) >= 10) {
        result += `-${validateDay}${time}`;
      } else {
        result += `-0${validateDay}${time}`;
      }
    }
    return result;
  }


  filtrer() {
    console.log('DataSource: ', this.dataSource.data);
    if (this.de && this.ds) {
      if (this.de > this.ds) {
        console.log(this.de);
        alert('La date d\'entree doit être supérieure à la date de sortie');
      } else {
        const filter = this.data.filter(x => x.dateBlockage >= this.de && x.dateBlockage <= this.ds);
        console.log('filter : ', filter);
        this.dataSource.data = filter;
      }
    }
  }
  refresh() {
    this.dataSource.data = this.oldDataSource;
  }
}

