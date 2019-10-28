import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { CheckList } from 'src/app/shared/models/checkList';

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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formConducteur = this.formBuilder.group({
      cin: ['', Validators.required],
      nomComplet: ['', Validators.required],
      matricule: ['', Validators.required]
    });
  }
  onSubmit(form: NgForm) {}

  getConducteur(event) {}

}
