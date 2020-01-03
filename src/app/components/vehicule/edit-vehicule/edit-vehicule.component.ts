import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EnginService } from 'src/app/core/services/engin/engin.service';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VehiculeService } from 'src/app/core/services/vehicule/vehicule.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-vehicule',
  templateUrl: './edit-vehicule.component.html',
  styleUrls: ['./edit-vehicule.component.scss'],
})
export class EditVehiculeComponent implements OnInit {
  editFormVehicule: FormGroup;
  date = new FormControl(moment());
  de;
  engins: any;
  fileToUpload;
  matcher = new FormErrorStateMatcher();
  isLoadingResults = false;
  fileData: File = null;
  previewUrl: any = null;
  selected;

  constructor(
    private formBuilder: FormBuilder,
    private enginService: EnginService,
    private dialogRef: MatDialogRef<EditVehiculeComponent>,
    private vehiculeService: VehiculeService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('Passed Data: ', this.data);
    this.editFormVehicule = this.formBuilder.group({
      type: ['', Validators.required],
      matricule: ['', Validators.required]
    });

    this.enginService.getEngins().subscribe(res => {
      if (res) {
        console.log('engin :', res)
        this.engins = res;
      }
    });
    this.selected = this.data.vehicule.idEngin;
    this.editFormVehicule.controls['matricule'].setValue(this.data.vehicule.matricule);
  }

  ngAfterViewInit(): void {
    this.de = moment(this.date.value).format('YYYY-MM-DD') + 'T00:00:00';
    // this.de = this.validateDate(moment(this.date.value).format('YYYY-MM-DD') + 'T00:00:00');
    console.log(`dateValidite : ${this.de}`);
  }

  editVehicule(form) {
    if (!form.valid) {
      return;
    }

    const dataEdit = {
      id: this.data.vehicule.id,
      matricule: form.controls['matricule'].value,
      idEngin: form.controls['type'].value,
      dateValidite: this.de,
      imageUrl: this.previewUrl != null ? this.previewUrl : (this.data.vehicule.imageUrl != null) ? this.data.vehicule.imageUrl : '',
    };

    console.log('data : ', dataEdit);
    this.vehiculeService.updateVehicule(this.data.vehicule.id, dataEdit).subscribe(res => {
      console.log('Ajout : ', res);
    });

    this.editFormVehicule.reset();
    this.closeDialog();
  }
  
  onChange(term) {
    console.log('Date: ', term.value);
    this.de = this.validateDate(term);
    console.log('date', this.de);
  }

  validateDate(date) {
    let result = `${date.value._i.year}`;
    const validateMonth = `${date.value._i.month}`;
    const validateDay = `${date.value._i.date}`;
    console.log('Month: ', validateMonth + ', Day: ' + validateDay);
    const time = 'T00:00:00';
    if (Number(validateMonth) < 9 && Number(validateDay) < 10) {
      result += `-0${Number(validateMonth) + 1}-0${validateDay}${time}`;
      // console.log('Resultat 1: ', result);
    } else {
      if (Number(validateMonth) >= 9) {
        result += `-${Number(validateMonth) + 1}`;
        // console.log('Resultat 2: ', result);
      } else {
        result += `-0${Number(validateMonth) + 1}`;
        // console.log('Resultat 3: ', result);
      }

      if (Number(validateDay) >= 10) {
        result += `-${validateDay}${time}`;
        // console.log('Resultat 4: ', result);
      } else {
        result += `-0${validateDay}${time}`;
        // console.log('Resultat 5: ', result);
      }
    }
    return result;
  }

  public upload(event: any): void {
    this.fileData = event.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
      console.log('Result: ', reader.result);
      console.log('Reader: ', this.previewUrl);
    };
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
