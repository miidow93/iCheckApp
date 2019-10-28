import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { CheckList } from 'src/app/shared/models/checkList';
import { DataService } from 'src/app/shared/services/data.service';
import { EnginService } from 'src/app/core/services/engin/engin.service';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { VehiculeService } from 'src/app/core/services/vehicule/vehicule.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-citerne',
  templateUrl: './citerne.component.html',
  styleUrls: ['./citerne.component.scss'],
})
export class CiterneComponent implements OnInit {

  formConducteur: FormGroup;
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

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private enginService: EnginService,
              private checkListService: CheckListService,
              private conducteurService: ConducteurService,
              private vehiculeService: VehiculeService, 
              private router: Router) { }

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

    this.values['b23'] = false;
    this.values['b24'] = false;
    this.values['b25'] = false;
    this.values['b26'] = false;
    this.values['b27'] = false;

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

  onSubmit(form: NgForm) {
    this.formValues.date = moment(new Date()).format('MM/DD/YYYY HH:mm:ss');
    this.formValues.site = localStorage.getItem('site');
    this.formValues.conducteur = { cin: form['cin'], nomComplet: form['nomComplet'] };
    this.formValues.vehicule = { matricule: form['matricule'], engin: 'Benne' };
    this.formValues.catchAll = { checklistConducteur: Object.values(this.conducteurCheckList), 
      checklistEquipement: Object.values(this.equipementCheckList),
      checklistEngin: Object.values(this.enginCheckList),
      checklistAttelage: Object.values(this.values)
    };
    console.log('Form: ', this.formValues);
    this.checkListService.addCheckList(this.formValues).subscribe(res => console.log(res));
    this.router.navigate(['engins']);
  }

  check(id) {
    console.log(id);
    const buttonID = `b${id}`;
    const button = document.getElementById(buttonID);
    // console.log(button.classList);
    if (button.classList.contains('isNotActive')) {
      button.classList.replace('isNotActive', 'isActive');
      this.values[`${buttonID}`] = true;

    } else {
      if (button.classList.contains('isActive')) {
        button.classList.replace('isActive', 'isNotActive');
        this.values[`${buttonID}`] = false;
      }
    }
    console.log('Values: ', this.values);
    // this.dataService.changeEquipementCheckList(this.values);
  }

  getAllConducteurs() {
    this.conducteurService.getAllConducteur().subscribe(res => {
      this.conducteurs = res;
      console.log('All Conducteurs', res);
    });
  }

  getAllVehicules() {
    this.vehiculeService.getAllVehicules('Citerne').subscribe(res => {
      console.log('Vehicules: ', res);
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
    );
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
    console.log(this.conducteurs.find(opt => opt.cin === event.option.value).nomComplet);
    this.nomComplet.next(this.conducteurs.find(opt => opt.cin === event.option.value).nomComplet);
    this.formConducteur.controls.nomComplet.patchValue(this.nomComplet.value);
  }

}
