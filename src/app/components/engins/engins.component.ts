import { Component, OnInit, ViewChild } from '@angular/core';
import { Conducteur } from 'src/app/shared/models/conducteur';
import { Engin } from 'src/app/shared/models/engin';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';
import { EnginService } from 'src/app/core/services/engin/engin.service';
import { Constants } from 'src/app/shared/constants';
import { Icons } from 'src/app/shared/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { MatTableDataSource, MatPaginator,DateAdapter,MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { faFilter, faSyncAlt, faBan, faCircle, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { CheckListRefService } from 'src/app/core/services/checkListRef/check-list-ref.service';
import { DataService } from 'src/app/shared/services/data.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-engins',
  templateUrl: './engins.component.html',
  styleUrls: ['./engins.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class EnginsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['site', 'date', 'conducteur', 'vehicule', 'engin', 'etat', 'action'];
  dataSource = new MatTableDataSource();
  dateEntree = new FormControl(moment());
  dateSortie = new FormControl(moment());
  conducteur: Conducteur;
  engins: Engin[];
  logoutIcon = Icons.logoutIcon;
  faFilter = faFilter;
  faSyncAlt = faSyncAlt;
  faQrCode = faQrcode;
  faBan = faBan;
  faCircle = faCircle;
  data = [];
  site: string = '';

  oldDataSource;
  de; ds;

  constructor(private enginService: EnginService,
    private router: Router,
    private platform: Platform,
    private checkListRefService: CheckListRefService,
    private checklistService: CheckListService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private sanitizer: DomSanitizer) {
  }



  ngOnInit() {
    this.dataService.allDataChecklist.subscribe();
    this.enginService.getEngins().subscribe(res => { this.engins = res; console.log(res); });
    this.site = localStorage.getItem('site');
    this.checkListRefService.getCheckListBySite(this.site).subscribe((res: any) => {
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
    this.router.navigateByUrl(`synthese/${element.idCheckListRef}`);
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
        alert('Periode invalide');
      } else {
        const filter = this.data.filter(x => x.date >= this.de && x.date <= this.ds);
        this.dataSource.data = filter;
      }
    }
  }

  refresh() {
    this.dataSource.data = this.oldDataSource;
  }
  
  createImagePath(serverPath: string) {
    return this.sanitizer.bypassSecurityTrustUrl(`${Constants.serverImg}${serverPath}`);
    // return `http://localhost:4772/${serverPath}`;
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async scanQR() {
    const options: BarcodeScannerOptions = {
      showTorchButton: true,
      orientation: 'portrait'
    };

    const scanCode = await this.barcodeScanner.scan(options);
    if (scanCode.text != '' || scanCode.text != null) {
      this.checklistService.getCheckListByMatricule(scanCode.text).subscribe(res => {
        console.log('Checklist by Qr: ', res);
        if (res != null) {
          this.router.navigateByUrl(`synthese/${res['id']}`);
          console.log('Is not null: ');
        }
      }, err => {
        this.toastAlert('Aucune checklist avec ce matricule');
        /*if(err.status === 404) {
          alert('Error Not Found');
        }*/
      });
    }

    console.log('Scan Code: ', scanCode);
  }

  async toastAlert(msg) {
    const toast = await this.toastCtrl.create({
      message: `${msg}`,
      duration: 2000,
      color: 'warning'
    });

    toast.present();
  }
}
