import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from 'src/app/shared/forms/question-base';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';
import { EnginService } from 'src/app/core/services/engin/engin.service';
import { Constants } from 'src/app/shared/constants';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';
import { VehiculeService } from 'src/app/core/services/vehicule/vehicule.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { startWith, map } from 'rxjs/operators';
import { filter } from 'minimatch';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [QuestionControlService, NgbRatingConfig]
})
export class DynamicFormComponent implements OnInit {
  
  @Input() questions: QuestionBase<any>[] = [];
  @Input() engin: string = '';
  form: FormGroup;
  formConducteur: FormGroup;
  formEngin: FormGroup;
  nomComplet = new BehaviorSubject<any>(null);
  payLoad = '';
  dir = 'rtl';
  size = 0;
  conducteurs = [];
  vehicules = [];
  imageEngin = '';

  filteredConducteurs: Observable<any[]>;
  filteredVehicules: Observable<any[]>;

  constructor(private qcs: QuestionControlService,
              private enginService: EnginService,
              private checkListService: CheckListService,
              private conducteurService: ConducteurService,
              private vehiculeService: VehiculeService,
              private formBuilder: FormBuilder,
              config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    console.log('DynamicFormComponent', this.questions);
    this.form = this.qcs.toFormGroup(this.questions);
    console.log('Length: ', this.questions.length);
    // await this.qcs.toFormGroup(this.questions).then(formGroup => this.form = formGroup);
    this.enginService.getEnginsByName(this.engin).subscribe(res => this.imageEngin = res.imageEngin);

    
    this.formConducteur = this.formBuilder.group({
      nomComplet: ['', Validators.required],
      cin: ['', Validators.required],
    });

    this.formEngin = this.formBuilder.group({
      matricule: ['', Validators.required],
      engin: [{ value: this.engin }, Validators.required]
    });
    this.getAllConducteurs();
    this.getAllVehicules();
    this.filterInitCond();

    /**/
  }

  onSubmit(form: NgForm) {
    console.log('Values: ', form);
    // this.payLoad = JSON.stringify(this.form.value);
  }

  onSub(form: NgForm) {
    console.log('Form Values: ', form);
    const data = {
      conducteur: { id: '1', nomComplet: 'biyi' },
      tracteur: { id: '2', engin: this.engin, matricule: '25879| 12| b' },
      date: new Date().toISOString(),
      catchAll: form
    };
    console.log('CheckList: ', data);
    this.checkListService.addCheckList(data).subscribe(res => console.log('Add CheckList: ', res));
  }

  createImagePath(serverPath: string) {
    return `${Constants.serverImg}${serverPath}`;
    // return `http://localhost:4772/${serverPath}`;
  }

  getAllConducteurs() {
    this.conducteurService.getAllConducteur().subscribe(res => {
      this.conducteurs = res;
      console.log('All Conducteurs', res);
    });
  } 

  getAllVehicules() {
    this.vehiculeService.getAllVehicules(this.engin).subscribe(res => console.log('Vehicules: ', res));
  }

  getConducteur(event: MatAutocompleteSelectedEvent) {
    console.log('Selected Option: ', event.option.value);
    console.log(this.conducteurs.find(opt => opt.cin == event.option.value).nomComplet);
    this.nomComplet.next(this.conducteurs.find(opt => opt.cin == event.option.value).nomComplet);
    //const cond = this.conducteurs.find(x => x.cin = event.option.value);
    //console.log(cond);
    /*const cond = this.conducteurs.filter(x => x.cin = cin);
    console.log(cond);*/
    //this.nomComplet.next(cond[0].nomComplet);
    //console.log(this.nomComplet.value);
  }

  private filterInitCond() {
    this.filteredConducteurs = this.formConducteur.controls.cin.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    // console.log('_filter: ', filterValue);
    return this.conducteurs.filter(option => option.cin.toLowerCase().includes(filterValue));
  }

}
