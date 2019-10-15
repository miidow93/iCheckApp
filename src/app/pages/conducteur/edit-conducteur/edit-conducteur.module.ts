import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditConducteurPage } from './edit-conducteur.page';

const routes: Routes = [
  {
    path: '',
    component: EditConducteurPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditConducteurPage]
})
export class EditConducteurPageModule {}
