import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { VehiculeService } from 'src/app/core/services/vehicule/vehicule.service';
import { startWith, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatStepper } from '@angular/material';
import { CheckList } from 'src/app/shared/models/checkList';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Icons } from 'src/app/shared/icons';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-benne',
  templateUrl: './benne.component.html',
  styleUrls: ['./benne.component.scss'],
  providers: [NgbRatingConfig],
  // encapsulation: ViewEncapsulation.None
})
export class BenneComponent implements OnInit {
  @ViewChild(MatStepper, {static: false}) stepper: MatStepper;
  formConducteur:FormGroup;
  filteredConducteurs: Observable<any[]>;
  filteredVehicules: Observable<any[]>;
  nomComplet = new BehaviorSubject<any>(null);
  formValues: CheckList = new CheckList();

  conducteurCheckList;
  enginCheckList;
  equipementCheckList;

  conducteurs = [];
  vehicules = [];
  values = [];
  totalRate = 0;
  equipementRate = 0;
  enginRate = 0;
  conducteurRate = 0;
  benneRate = 0;
  benneImg = Icons.benneImg;
  precedentIcon = Icons.precedentIcon;
  FargeHolcimImg = Icons.FargeHolcimImg;
  faQrCode = faQrcode;


  constructor(config: NgbRatingConfig,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private checkListService: CheckListService,
    private conducteurService: ConducteurService,
    private vehiculeService: VehiculeService,
    private router: Router,
    private barcodeScanner: BarcodeScanner) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.dataService.currentConducteurCheckList.subscribe(res => {
      console.log('Conducteur Subscribe: ', this.conducteurCheckList);
      this.conducteurCheckList = res;
    });

    this.dataService.currentEnginCheckList.subscribe(res => {
      console.log('Engin Subscribe', this.enginCheckList);
      this.enginCheckList = res;
    });

    this.dataService.currentEquipementCheckList.subscribe(res => {
      console.log('Equipement Subscribe', this.equipementCheckList);
      this.equipementCheckList = res;
    });

    this.dataService.currentConducteurRating.subscribe(res => {
      console.log('Conducteur Rating subscribe: ', res);
      this.conducteurRate = res;
      const rate = (this.conducteurRate + this.enginRate + this.equipementRate + this.benneRate) / 27;
      this.dataService.changeRatingCheckList(rate);
    });

    this.dataService.currentEnginRating.subscribe(res => {
      console.log('Engin Rating subscribe: ', res);
      this.enginRate = res;
      const rate = (this.conducteurRate + this.enginRate + this.equipementRate + this.benneRate) / 27;
      this.dataService.changeRatingCheckList(rate);
    });

    this.dataService.currentEquipementRating.subscribe(res => {
      console.log('Equipement Rating subscribe: ', res);
      this.equipementRate = res;
      const rate = (this.conducteurRate + this.enginRate + this.equipementRate + this.benneRate) / 27;
      this.dataService.changeRatingCheckList(rate);
    });

    this.dataService.currentVehiculeRating.subscribe(res => {
      console.log('Vehicule Rating subscribe: ', res);
      this.benneRate = res;
      const rate = (this.conducteurRate + this.enginRate + this.equipementRate + this.benneRate) / 27;
      this.dataService.changeRatingCheckList(rate);
    });

    this.dataService.currentRatingCheckList.subscribe(res => {
      console.log('Rating checklist Subscribe: ', (res * 100).toFixed(2));
      this.totalRate = parseFloat((res * 100).toFixed(2));
      console.log('rate: ', this.totalRate);
    });
    this.dataService.allDataChecklist.subscribe();
    this.dataService.currentDateBlockage.subscribe(res => console.log('Date Blockage: ', res));
    this.dataService.currentVehiculeID.subscribe(res => console.log('Vehicule ID: ', res));
    this.dataService.currentBlockageID.subscribe(res => console.log('Blockage ID: ', res));
    this.dataService.currentCheckListID.subscribe(res => console.log('CheckList ID: ', res));

    this.values['b24'] = false;
    this.values['b25'] = false;
    this.values['b26'] = false;
    this.values['b27'] = false;
    this.values['b28'] = false;


    this.formConducteur = this.formBuilder.group({
      cin: ['', Validators.required],
      nomComplet: ['', Validators.required],
      matricule: ['', Validators.required]
    });

    this.getAllConducteurs();
    this.getAllVehicules();
    this.filterInitCond();
    this.filterInitVehicule();
  }


  /*initializeApp() {
    this.platform.ready().then(res => {
      if(!this.platform.is('android') || !this.platform.is('tablet')) {
        console.log('is not a tablet');
        this.router.navigate(['login']);
      } else {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
    });
  }*/

  onSubmit(form) {
    if (!form.valid) {
      alert('Veuillez saisir les données du conducteur!');
      return;
    }

    this.formValues.date = moment(new Date()).format('MM/DD/YYYY HH:mm:ss');
    this.formValues.rating = this.totalRate;
    this.formValues.site = localStorage.getItem('site');
    this.formValues.conducteur = { cin: form.controls['cin'].value, nomComplet: form.controls['nomComplet'].value };
    this.formValues.vehicule = { matricule: form.controls['matricule'].value, engin: 'Benne' };
    this.formValues.catchAll = {
      checklistConducteur: Object.values(this.conducteurCheckList),
      checklistEquipement: Object.values(this.equipementCheckList),
      checklistEngin: Object.values(this.enginCheckList),
      checklistAttelage: Object.values(this.values)
    };
    console.log('Form: ', this.formValues);
    this.dataService.changeCheckList(this.formValues);
    this.stepper.next();
    /*
        // this.dataService.changeDateBlockage(res);
        this.dataService.changeVehiculeID(res['vehicule']['idVehicule']);
        this.dataService.changeBlockageID(res['vehicule']['idBlockage']);
        this.dataService.changeCheckListID(res['id']);
        this.dataService.changeDateBlockage(moment(new Date(res['date'])).format('MM/DD/YYYY'));
      });
    } else {
      return;
    }*/

  }

  check(id) {
    console.log(id);
    const buttonID = `b${id}`;
    const button = document.getElementById(buttonID);
    // console.log(button.classList);
    if (button.classList.contains('isNotActive')) {
      button.classList.replace('isNotActive', 'isActive');
      this.values[`${buttonID}`] = true;
      this.benneRate++;
      this.dataService.changeVehiculeRating(this.benneRate);
    } else {
      if (button.classList.contains('isActive')) {
        button.classList.replace('isActive', 'isNotActive');
        this.values[`${buttonID}`] = false;
        this.benneRate--;
        this.dataService.changeVehiculeRating(this.benneRate);
      }
    }
    console.log('Values: ', this.values)
    // this.dataService.changeBenneCheckList(this.values);
  }

  NavigatToEngins(){
    this.router.navigate(['engins']);
  }
  getAllConducteurs() {
    this.conducteurService.getAllConducteur().subscribe(res => {
      this.conducteurs = res;
      console.log('All Conducteurs', res);
    });
  }

  getAllVehicules() {
    this.vehiculeService.getAllVehicules('Benne').subscribe(res => {
      console.log('Vehicules: ', res)
      this.vehicules = res;
    });
  }

  private filterInitCond() {
    this.filteredConducteurs = this.formConducteur.controls.cin.valueChanges.pipe(
      startWith(''),
      map(value => this._filterConducteur(value))
    );
  }

  private filterInitVehicule() {
    this.filteredVehicules = this.formConducteur.controls.matricule.valueChanges.pipe(
      startWith(''),
      map(value => this._filterVehicule(value))
    )
  }


  _filterConducteur(value: any): any[] {
    const filterValue = value.toLowerCase();
    // console.log('_filter: ', filterValue);
    return this.conducteurs.filter(option => option.cin.toLowerCase().includes(filterValue));
  }

  _filterVehicule(value: any): any[] {
    const filterValue = value.toLowerCase();
    console.log('_filter: ', filterValue);
    return this.vehicules.filter(option => option.matricule.includes(filterValue));
  }

  getConducteur(event: MatAutocompleteSelectedEvent) {
    console.log('Selected Option: ', event.option.value);
    console.log(this.conducteurs.find(opt => opt.cin == event.option.value).nomComplet);
    this.nomComplet.next(this.conducteurs.find(opt => opt.cin == event.option.value).nomComplet);
    this.formConducteur.controls.nomComplet.patchValue(this.nomComplet.value);
  }

  completed() {
    console.log('Completed');
    this.stepper.selected.completed = true;
  }

  async scanQR() {
    const options: BarcodeScannerOptions = {
      showTorchButton: true,
      orientation: 'portrait'
    };

    const scanCode = await this.barcodeScanner.scan(options);
    if (scanCode.text != '' || scanCode.text != null) {
      this.formConducteur.controls['matricule'].setValue(scanCode.text);
      }
  }

}
