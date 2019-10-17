import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ConducteurService } from 'src/app/core/services/conducteur/conducteur.service';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { EditConducteurComponent } from './edit-conducteur/edit-conducteur.component';

@Component({
  selector: 'app-conducteur',
  templateUrl: './conducteur.component.html',
  styleUrls: ['./conducteur.component.scss'],
})
export class ConducteurComponent implements OnInit {

  displayedColumns: string[] = ['nomcomplet', 'cin', 'cnss', 'assurance', 'dateValiditeAssurance', 'patente','actions'];
  dataSource = new MatTableDataSource();
  conducteurForm: FormGroup;
  societeControl = new FormControl();
  searchKey: string;
  constructor(private dialog: MatDialog,private service: ConducteurService,
              private formbuilder: FormBuilder,private conducteurDataService:DataService) { }
@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.refresh();
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
  refresh() {
    this.service.getAllConducteur().subscribe((res: any[]) => {
      this.conducteurDataService.changeConducteurDataSource(res);
    });
    this.conducteurDataService.currentConducteurDataSource.subscribe(data => {this.dataSource.data = data;this.dataSource.paginator = this.paginator});
  }
  // rénitialisation Form
  resetform() {
    this.conducteurForm.reset();
  }
  // Ajouter un conducteur
  Addconducteur(data: NgForm) {
    console.log(data);
    this.service.AddConducteur(data).subscribe(res => {
      this.refresh();
      this.resetform();
    });
    
  }
  onEdit(element) {
    console.log(element);
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = '80%';
    config.data = element;
    this.dialog.open(EditConducteurComponent, config)
      .afterClosed().subscribe(res => {
        console.log('Close: ', res);
        this.refresh();
      });
  }
}
