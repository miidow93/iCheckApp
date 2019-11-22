import { Component, OnInit } from '@angular/core';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { FormBuilder, Validators, FormGroup, NgForm, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-add-conducteur',
  templateUrl: './add-conducteur.component.html',
  styleUrls: ['./add-conducteur.component.scss'],
})
export class AddConducteurComponent implements OnInit {

  conducteurForm: FormGroup;
  dateValiditeAssurance = new FormControl(moment());

  constructor(private conducteurService: ConducteurService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.conducteurForm = this.formbuilder.group({
      nomComplet: ['', Validators.required],
      cin: ['', Validators.required],
      cnss: ['', Validators.required],
      assurance: [''/*, Validators.required*/],
      patente: [''/*, Validators.required*/],
      societe: [''/*, Validators.required*/],
    });
  }

  Addconducteur(form) {
    if (!form.valid) {
      console.log('is not valid');
      return;
    }

    const data = {
      nomComplet: form.controls['nomComplet'].value,
      cin: form.controls['cin'].value,
      cnss: form.controls['cnss'].value,
      assurance: form.controls['assurance'].value,
      patente: form.controls['patente'].value,
      societe: form.controls['societe'].value,
      dateValiditeAssurance: moment(this.dateValiditeAssurance.value).format('YYYY/MM/DD')
    };
    console.log('Data Conducteur: ', data);

    this.conducteurService.AddConducteur(data).subscribe(res => {
      //this.refresh();
      console.log('Add Conducteur: ', res);
      this.resetform();
    });
  }

  resetform() {
    this.dateValiditeAssurance.setValue(moment());
    this.conducteurForm.reset();
  }
}
