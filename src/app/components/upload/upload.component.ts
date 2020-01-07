import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { catchError } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { BlockageService } from 'src/app/core/services/blockage/blockage.service';
import { Router } from '@angular/router';
import { MatRadioChange, MatRadioButton } from '@angular/material';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

  motifForm: FormGroup;
  image;
  date;
  vehiculeID;
  blockageID;
  checklistID;
  checklist;
  imagesBase = [];
  etats = [{ etat: 'Autoriser' }, { etat: 'Non autoriser' }];


  constructor(private formBuilder: FormBuilder,
    private camera: Camera,
    private dataService: DataService,
    private checkListService: CheckListService,
    private uploadService: UploadService,
    private router: Router) { }

  ngOnInit() {
    this.dataService.allDataChecklist.subscribe(res => {
      this.checklist = res;
      console.log('Checklist Infos All: ', res);
    });

    this.dataService.changeCheckList({ etat: false });

   /* this.dataService.currentDateBlockage.subscribe(res => {
      console.log('Date Blockage: ', res);
      this.date = res;
    });

    this.dataService.currentVehiculeID.subscribe(res => {
      console.log('Vehicule ID: ', res);
      this.vehiculeID = res;
    });

    this.dataService.currentBlockageID.subscribe(res => {
      console.log('Blockage ID: ', res);
      this.blockageID = res;
    });

    this.dataService.currentCheckListID.subscribe(res => {
      console.log('CheckList ID: ', res);
      this.checklistID = res;
    });*/

    this.motifForm = this.formBuilder.group({
      motif: ['', Validators.required],
      etat: ['', Validators.required]
    });

  }

  takePicture() {
    const cameraOpt: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(cameraOpt).then((imageData) => {
      console.log('Image Data: ', imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
      this.dataService.changeCheckList({ imageURL: base64Image });
      /*this.uploadService.upload(this.image).subscribe(res => {
        console.log('Path: ', res);
      });*/
    }, (err) => {
      console.error(err);
    }).catch(err => catchError(err));
  }

  submit(form) {
    if (!form.valid) {
      return;
    }

    /*const data = {
      id: this.blockageID,
      motif: form.controls['motif'].value,
      dateBlockage: this.date,
      idCheckList: this.checklistID,
      idVehicule: this.vehiculeID,
      imageUrl: this.image ? this.image : ''
    };

    console.log('Blockage Data: ', data);

    this.blockageService.updateBlockage(this.blockageID, data).subscribe(res => {
      console.log('Update Blockage: ', res);
      this.dataService.changeConducteurRating(0);
      this.dataService.changeVehiculeRating(0);
      this.dataService.changeEnginRating(0);
      this.router.navigate(['engins']);
    });*/
    console.log('Form: ', form);
    this.dataService.changeCheckList({ motif: form.controls['motif'].value });
    this.dataService.changeCheckList({ imageURL: this.image });
    this.dataService.changeCheckList(
      {
        controlleur: {
          id: localStorage.getItem('id'), 
          nomComplet: localStorage.getItem('nomComplet'), 
          username: localStorage.getItem('username')
        }
      });
    if (confirm('Etes-vous sûr de vouloir continuer ?')) {
      console.log('checklist: ', this.checklist);
      this.checkListService.addCheckList(this.checklist).subscribe(res => {
        console.log('checklist: ', res);
        this.router.navigate(['engins']);
      });
    }
  }

  onChange(mrChange: MatRadioChange) {
    console.log('Change: ', mrChange.value);
    if (mrChange.value === 'Autoriser') {
      this.dataService.changeCheckList({ etat: false });
    } else {
      this.dataService.changeCheckList({ etat: true });
    }
    let mrButton: MatRadioButton = mrChange.source;
    console.log(mrButton.name);
    console.log(mrButton.checked);
    console.log(mrButton.inputId);
  }

}
