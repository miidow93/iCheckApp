import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockageService } from 'src/app/core/services/blockage/blockage.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { faFilter, faSyncAlt, faBan, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { saveAs } from 'file-saver/';
import { ToastController, Platform } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'vehicule', 'dateBlockage', 'motif', 'dateDeblockage'];
  displayedColumnsBenne: string[] = ['controlleur','vehicule','conducteur','etat','motif','control1','control2','control3','control4','control5','control6','control7','control8','control9','control10']
  dataSourceBenne = new MatTableDataSource();
  dataSourceCiterne = new MatTableDataSource();
  dataSourcePlateau = new MatTableDataSource();
  dateEntree = new FormControl(moment());
  dateSortie = new FormControl(moment());
  faFilter = faFilter;
  faSyncAlt = faSyncAlt;
  faBan = faBan;
  faCircle = faCircle;
  data = [];
  de; ds;
  oldDataSourceBenne;
  oldDataSourceCiterne;
  oldDataSourcePlateau;
  constructor(private blockageService: BlockageService,
    private file: File,
    private fileTransfer: FileTransfer,
    private fileOpener: FileOpener,
    private excelService: ExcelService,
    private toastCtrl: ToastController,
    private platform: Platform,
    private check:CheckListService) { }

  @ViewChild(MatPaginator, { static: false }) paginatorBenne: MatPaginator;
  // @ViewChild(MatPaginator, { static: false }) paginatorCiterne: MatPaginator;
  // @ViewChild(MatPaginator, { static: false }) paginatorPlateau: MatPaginator;

  ngOnInit() {
    // this.getBlockage();
    this.getAllcheckByType();
  }
  ngAfterViewInit() {
    this.de = moment(this.dateEntree.value).format('YYYY-MM-DD') + 'T00:00:00';
    this.ds = moment(this.dateSortie.value).format('YYYY-MM-DD') + 'T00:00:00';
  }

  applyFilter(filterValue: string) {
    this.dataSourceBenne.filter = filterValue.trim().toLowerCase();
    this.dataSourceCiterne.filter = filterValue.trim().toLowerCase();
    this.dataSourcePlateau.filter = filterValue.trim().toLowerCase();
  }
  getBlockage() {
    this.blockageService.getBolckedEngins().subscribe((res: any[]) => {
      // BENNE
      // console.log('Data :',res);
      // this.dataSourceBenne.data = res.filter(x=>x.idVehiculeNavigation.idEnginNavigation.nomEngin === 'Benne');
      // this.dataSourceBenne.paginator = this.paginatorBenne;
      // this.oldDataSourceBenne = this.dataSourceBenne.data;
      // this.data = <any[]>this.dataSourceBenne.data;
      // CITERNE
      // this.dataSourceCiterne.data = res.filter(x=>x.idVehiculeNavigation.idEnginNavigation.nomEngin === 'Citerne');
      // this.dataSourceCiterne.paginator = this.paginatorCiterne;
      // this.oldDataSourceCiterne = this.dataSourceCiterne.data;
      // this.data = <any[]>this.dataSourceCiterne.data;
      // PLATEAU
      // this.dataSourcePlateau.data = res.filter(x=>x.idVehiculeNavigation.idEnginNavigation.nomEngin === 'Plateau');
      // this.dataSourcePlateau.paginator = this.paginatorPlateau
      // this.oldDataSourcePlateau = this.dataSourcePlateau.data;
      // this.data = <any[]>this.dataSourcePlateau.data;
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


  // filtrer() {
  //   console.log('DataSource: ', this.dataSource.data);
  //   if (this.de && this.ds) {
  //     if (this.de > this.ds) {
  //       console.log(this.de);
  //       alert('La date d\'entree doit être supérieure à la date de sortie');
  //     } else {
  //       const filter = this.data.filter(x => x.dateBlockage >= this.de && x.dateBlockage <= this.ds);
  //       console.log('filter : ', filter);
  //       this.dataSource.data = filter;
  //     }
  //   }
  // }
  // refresh() {
  //   this.dataSource.data = this.oldDataSource;
  // }
  exporter() {
    console.log('Date: ', this.de + ' ' + this.ds);
    const date = { startDate: this.de.toString(), endDate: this.ds.toString() };
    console.log('Test: ', date);
    this.excelService.exportToExcel(date).subscribe(res => {
      console.log('Res: ', res);
      if (res.size > 0) {
        const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
        const pwa = window.open(url);
        // const filename = uuid.v4();
        const filename = 'blockage_' + moment(new Date()).format('DDMMYYYY_hhmmssSSS') + '.xlsx';
        if (this.platform.is('android') || this.platform.is('tablet')) {
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

  async toastPresent(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  createFile(filePath, filename, blob) {
    console.log('Create File path: ', filePath);
    console.log('Create File name: ', name);
    console.log('Create File blob: ', blob);
    this.file.writeFile(filePath, filename + '.xlsx', blob, { replace: true }).then((fileEntry: FileEntry) => {
      console.log('File Created: ', fileEntry);
      this.fileOpener.open(fileEntry.toURL(), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .then(() => console.log('File is opened'))
        .catch(err => console.error(err));
    });
  }

  getAllcheckByType(){
    this.check.getAllCheckListByType().subscribe(
      ((res : any) =>{
        console.log('Benne Data :',res)
      this.dataSourceBenne.data = res;
      this.dataSourceBenne.paginator = this.paginatorBenne;
      this.oldDataSourceBenne = this.dataSourceBenne.data;
      this.data = <any[]>this.dataSourceBenne.data;
    }
    ));
    // this.check.getAllCheckListByType('Citerne').subscribe(
    //   (res:any[])=> console.log('dataCheckCiterne :',res)
    //   );
    // this.check.getAllCheckListByType('Plateau').subscribe(
    //   (res: any[])=> console.log('dataCheckPlateau :', res)
    //   );
  
}
}
