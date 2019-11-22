import { Component, OnInit, Inject } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-conducteur',
  templateUrl: './edit-conducteur.component.html',
  styleUrls: ['./edit-conducteur.component.scss'],
})
export class EditConducteurComponent implements OnInit {

  dateValiditeAssurance = new FormControl(moment());

  editConducteurForm: FormGroup;
  fileToUpload;
  matcher = new FormErrorStateMatcher();
  isLoadingResults = false;
  fileData: File = null;
  previewUrl: any = null;

  constructor(private formBuilder: FormBuilder,
    private conducteurService: ConducteurService,
    private dialogRef: MatDialogRef<EditConducteurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private conducteurDataService: DataService) { }

  ngOnInit() {
    this.conducteurDataService.currentConducteurDataSource.subscribe();
    console.log('date assurance: ', this.data.dateValiditeAssurance);
    this.editConducteurForm = this.formBuilder.group({
      nomComplet: [this.data.nomComplet, Validators.required],
      cin: [this.data.cin, Validators.required],
      cnss: [this.data.cnss, Validators.required],
      assurance: [this.data.assurance, Validators.required],
      // dateValiditeAssurance: [{ value: moment(this.data.dateValiditeAssurance).format('DD/MM/YYYY') }, Validators.required],
      patente: [this.data.patente, Validators.required],
      societe: [this.data.societe, Validators.required],
    });
  }

  onEditSubmit(form) {
    if (!form.valid) {
      console.log('is not valid');
      return;
    }

    const data = {
      id: this.data.id,
      nomComplet: form.controls['nomComplet'].value,
      cin: form.controls['cin'].value,
      cnss: form.controls['cnss'].value,
      assurance: form.controls['assurance'].value,
      patente: form.controls['patente'].value,
      societe: form.controls['societe'].value,
      dateValiditeAssurance: moment(this.dateValiditeAssurance.value).format('DD/MM/YYYY')
    };
    this.conducteurService.updateConducteur(this.data.id, data).subscribe(async res => {
      await this.conducteurService.getAllConducteur().pipe(take(1)).toPromise().then(data => this.conducteurDataService.changeConducteurDataSource(data));
    });
    this.editConducteurForm.reset();
    this.dialogRef.close();
    // this.dialogRef.afterClosed().subscribe(res => this.updateDataSource());
  }

  close() {
    this.dialogRef.close();
  }

}
