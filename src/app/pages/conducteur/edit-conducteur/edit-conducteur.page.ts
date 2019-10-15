import { Component, OnInit, Inject } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import * as moment from 'moment';
@Component({
  selector: 'app-edit-conducteur',
  templateUrl: './edit-conducteur.page.html',
  styleUrls: ['./edit-conducteur.page.scss'],
})
export class EditConducteurPage implements OnInit {

  editConducteurForm: FormGroup;
  fileToUpload;
  matcher = new FormErrorStateMatcher();
  isLoadingResults = false;
  fileData: File = null;
  previewUrl: any = null;

  constructor(private formBuilder: FormBuilder,
              private conducteurService: ConducteurService,
              private dialogRef: MatDialogRef<EditConducteurPage>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private conducteurDataService: DataService) { }

  ngOnInit() {
    this.conducteurDataService.currentConducteurDataSource.subscribe();
    
    this.editConducteurForm = this.formBuilder.group({
      nomcomplet: ['', Validators.required],
      cin: ['', Validators.required],
      cnss: ['', Validators.required],
      assurance: ['', Validators.required],
      dateValiditeAssurance: [{ value: moment().format('DD/MM/YYYY') }, Validators.required],
      patente: ['', Validators.required],
      societe: ['', Validators.required],
    });
  }

  onEditSubmit(form) {
       this.conducteurService.updateConducteur(this.data.id, form.value).subscribe(async res => {
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
