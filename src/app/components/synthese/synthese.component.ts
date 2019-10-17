import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.scss'],
})
export class SyntheseComponent implements OnInit {
  
  displayedColumns: string[] = ['date', 'matricule', 'engin', 'raiting','detail'];
  dataSource = new MatTableDataSource();

  constructor() { }

  ngOnInit() {}

}
