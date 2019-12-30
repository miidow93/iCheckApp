import { Component, OnInit } from '@angular/core';
import { VehiculeService } from 'src/app/core/services/vehicule/vehicule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss'],
})
export class QrGeneratorComponent implements OnInit {

  vehicules;
  matriculeForm: FormGroup;
  qrData = 'ICheck';
  elementType: 'url' | 'img' | 'canvas' = 'url';

  constructor(private formBuilder: FormBuilder, private vehiculeService: VehiculeService) { }

  ngOnInit() {
    this.createForm();
    this.getAllVehicules();
  }

  getAllVehicules() {
    this.vehiculeService.getAll().subscribe(res => {
      console.log('Qr Generator Vehicules: ', res);
      this.vehicules = res;
    });
  }

  createForm() {
    this.matriculeForm = this.formBuilder.group({
      matricule: ['', Validators.required]
    });
  }

  test(data) {
    console.log('Select Change: ', data);
    this.qrData = data;
  }

}
