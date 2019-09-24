import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AttelagePage } from './attelage.page';

const routes: Routes = [
  {
    path: '',
    component: AttelagePage
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
  declarations: [AttelagePage]
  // declarations: [AttelagePage, DynamicFormComponent, DynamicFormQuestionComponent],
  // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AttelagePageModule {}
