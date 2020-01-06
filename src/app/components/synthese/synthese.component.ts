import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { CheckListRefService } from 'src/app/core/services/checkListRef/check-list-ref.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { faFilter, faSyncAlt, faBan, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { saveAs } from 'file-saver/';
import { ToastController, Platform } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class SyntheseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'date', 'conducteur', 'vehicule', 'engin','action'];
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
    private platform: Platform,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private file: File,
    private fileOpener: FileOpener,
    private excelService: ExcelService,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    console.log('Synthese Init');
    this.checkListRefService.getAllCheckListRef().subscribe((res: any) => {
      console.log('CheckListRefs: ', res);
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
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
    const data = {
      id: element.id,
      idCheckListRef: element.idCheckListRef,
      rating: element.rating,
      date: element.date,
      idConducteur: element.idConducteur,
      idVehicule: element.idVehicule, 
      etat: operation === 'lock' ? true : false
    }
    this.checkListRefService.updateCheckList(data.id, data).subscribe(res => {
      console.log('Update Checklist ref', res);
    });
    // console.log(`Element: , operation: ${operation}`, element);
    element.etat = operation === 'lock' ? true : false
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exporter() {
    console.log('Date: ', this.de + ' ' + this.ds);
    const date = { startDate: this.de.toString(), endDate: this.ds.toString() };
    console.log('Test: ', date);
    this.excelService.exportChecklistToExcel(date).subscribe(res => {
      console.log('Res: ', res);
      if (res.size > 0) {
        const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
        const pwa = window.open(url);
        // const filename = uuid.v4();
        const filename = 'historique_' + moment(new Date()).format('DDMMYYYY_hhmmssSSS') + '.xlsx';
        if (this.platform.is('android') || this.platform.is('tablet') && !this.platform.is('desktop')) {
          console.log('Tablet');
          // let filePath = (this.platform.is('android')) ? this.file.externalRootDirectory : this.file.cacheDirectory;
          this.file.checkDir(this.file.externalRootDirectory, 'iCheck').then(res => {
            console.log('Directory exists: ', res);
            let filePath = (this.platform.is('android')) ? this.file.externalRootDirectory + '/iCheck' : this.file.cacheDirectory;
            this.createFile(filePath, filename, blob);
          }).catch(err => {
            console.log('Directory doesn\'t exists', JSON.stringify(err));
            this.file.createDir(this.file.externalRootDirectory, 'iCheck', false).then(res => {
              console.log('Directory created: ', res);
              let filePath = this.file.externalRootDirectory + '/iCheck';
              this.createFile(filePath, filename, blob);
            }).catch(err => {
              console.log('Cannot create the directory: ', JSON.stringify(err));
            });
          });

        } else {
          saveAs(blob, `${filename}`);
          if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
            alert('Please disable your Pop-up blocker and try again.');
          }
        }


      } else {
        this.toastPresent('Aucune données disponible pour les deux dates.');
      }
    });
  }

  createFile(filePath, filename, blob) {
    console.log('Create File path: ', filePath);
    console.log('Create File name: ', name);
    console.log('Create File blob: ', blob);
    this.file.writeFile(filePath, filename + '.xlsx', blob).then((fileEntry: FileEntry) => {
      console.log('File Created: ', fileEntry);
      this.fileOpener.open(fileEntry.toURL(), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .then(() => console.log('File is opened'))
        .catch(err => console.error(err));
    });
  }

  async toastPresent(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
