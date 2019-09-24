import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-conducteur',
  templateUrl: './conducteur.page.html',
  styleUrls: ['./conducteur.page.scss'],
})
export class ConducteurPage implements OnInit {

  displayedColumns: string[] = ['nomcomplet', 'cin', 'cnss', 'assurance', 'dateValiditeAssurance', 'patente'];
  dataSource = new MatTableDataSource();
  conducteurForm: FormGroup;
  societeControl = new FormControl();
  constructor(private service: ConducteurService,
              private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.getAllConducteur();
    this.conducteurForm = this.formbuilder.group({
      nomcomplet: ['', Validators.required],
      cin: ['', Validators.required],
      cnss: ['', Validators.required],
      assurance: ['', Validators.required],
      dateValiditeAssurance: [{ value: moment().format('DD/MM/YYYY') }, Validators.required],
      patente: ['', Validators.required],
      societe: ['', Validators.required],

    });
  }
  // Recuperation de la liste des conducteurs
  getAllConducteur() {
    this.service.getAllConducteur().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  // rénitialisation Form
  resetform() {
    this.conducteurForm.reset();
  }
  // Ajouter un conducteur
  Addconducteur(data: NgForm) {
    console.log(data);
    this.service.AddConducteur(data).subscribe(res => {
      this.getAllConducteur();
      this.resetform();
    });
  }
}
