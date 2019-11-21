import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CheckListRefService } from 'src/app/core/services/checkListRef/check-list-ref.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as moment from  'moment';
import { faFilter, faSyncAlt, faBan, faCircle  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.scss'],
})
export class SyntheseComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['id', 'date', 'conducteur', 'vehicule', 'engin', 'etat', 'rating', 'action'];
  dataSource = new MatTableDataSource();
  dateEntree = new FormControl(moment());
  dateSortie = new FormControl(moment());
  faFilter = faFilter;
  faSyncAlt = faSyncAlt;
  faBan = faBan;
  faCircle = faCircle;
  data = [];

  oldDataSource;
  de; ds;
  
  constructor(private checkListRefService: CheckListRefService, 
            private router: Router,
            private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('Synthese Init');
    this.checkListRefService.getAllCheckListRef().subscribe((res: any)   => {
      console.log('CheckListRefs: ', res);
      this.dataSource.data = res;
      this.oldDataSource = this.dataSource.data;
      this.data = <any[]>this.dataSource.data;
    });
  }

  ngAfterViewInit() {
    this.de = moment(this.dateEntree.value).format('YYYY-MM-DD') + 'T00:00:00';
    this.ds = moment(this.dateSortie.value).format('YYYY-MM-DD') + 'T00:00:00';
  }

  showDetails(element) {
    this.router.navigateByUrl(`/admin/(admin:synthese/${element.idCheckListRef}`);
    console.log('Element: ', element);
    console.log(this.activatedRoute)
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
        const filter = this.data.filter(x => x.date >= this.de && x.date <= this.ds);
        this.dataSource.data = filter;
      }
    }
  }

  refresh() {
    this.dataSource.data = this.oldDataSource;
  }

  blocked(element, operation) {
    console.log(`Element: ${element}, operation: ${operation}`);
  }
}
