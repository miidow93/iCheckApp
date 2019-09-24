import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TracteurPage } from './tracteur.page';
import { HomePage } from '../home/home.page';
import { HomePageModule } from '../home/home.module';

const routes: Routes = [
  {
    path: '',
    component: TracteurPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TracteurPage, HomePage],
  // exports: [TracteurPage]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TracteurPageModule {}
