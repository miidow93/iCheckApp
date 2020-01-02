import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { EnginService } from 'src/app/core/services/engin/engin.service';
import { VehiculeService } from 'src/app/core/services/vehicule/vehicule.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss'],
})
export class VehiculeComponent implements OnInit {
  formVehicule : FormGroup;
  date = new FormControl(moment());
  de;
  engins: any;
  fileData: File = null;
  previewUrl: any = null;
  constructor(private route:Router,private formBuilder : FormBuilder,private vehiculeService : VehiculeService,private enginService:EnginService) { }

  ngOnInit() {
    this.formVehicule = this.formBuilder.group({
      type : ['',Validators.required],
      matricule : ['',Validators.required]
    });
    this.enginService.getEngins().subscribe(res => {
      if (res) {
        console.log('engin :',res)
        this.engins = res;
      }
    });
  }

  ngAfterViewInit(): void {
    this.de = moment(this.date.value).format('YYYY-MM-DD') + 'T00:00:00';
    // this.de = this.validateDate(moment(this.date.value).format('YYYY-MM-DD') + 'T00:00:00');
    console.log(`date : ${this.de}`);
  }

  onChange(term) {
      console.log('Date: ', term.value);
      this.de = this.validateDate(term);
      console.log('date',this.de); 
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
  AddVehicule(form) {
    const data = {
      matricule : form.controls['matricule'].value,
      idEngin : form.controls['type'].value,
      dateValidite : this.de,
      imageUrl: this.previewUrl,
    }
    console.log('data : ', data);
    this.vehiculeService.addVehicule(data).subscribe(res => {
      console.log('Ajout : ',res)
    });
    this.formVehicule.reset();
  }

  public upload(event: any): void {
    this.fileData = event.target.files[0];
    console.log('FileName: ', this.fileData.name);
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
  navigateTo(){
    this.route.navigate(['admin', { outlets: { admin: 'vehicule' } }]);
  }
 
}
