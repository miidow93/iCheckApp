import { AttelagePage } from './pages/attelage/attelage.page';
import { TracteurPage } from './pages/tracteur/tracteur.page';
import { HomePage } from './pages/home/home.page';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AttelagePageModule } from './pages/attelage/attelage.module';
import { TracteurPageModule } from './pages/tracteur/tracteur.module';
import { HomePageModule } from './pages/home/home.module';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';

@NgModule({
  declarations: [AppComponent, CustomFormComponent, DynamicFormComponent, DynamicFormQuestionComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports: [],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
