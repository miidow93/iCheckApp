import { Component, OnInit } from '@angular/core';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-add-conducteur',
  templateUrl: './add-conducteur.component.html',
  styleUrls: ['./add-conducteur.component.scss'],
})
export class AddConducteurComponent implements OnInit {

  conducteurForm: FormGroup;

  constructor(private service: ConducteurService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.conducteurForm = this.formbuilder.group({
      nomComplet: ['', Validators.required],
      cin: ['', Validators.required],
      cnss: ['', Validators.required],
      assurance: ['', Validators.required],
      dateValiditeAssurance: [{ value: moment().format('DD/MM/YYYY') }, Validators.required],
      patente: ['', Validators.required],
      societe: ['', Validators.required],
    });
  }

  Addconducteur(data: NgForm) {
    console.log(data);
    this.service.AddConducteur(data).subscribe(res => {
      //this.refresh();
      this.resetform();
    });
  }

  resetform() {
    this.conducteurForm.reset();
  }
}
