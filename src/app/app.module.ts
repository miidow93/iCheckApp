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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

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
import { CheckListComponent } from './components/check-list/check-list.component';
import { EnginsComponent } from './components/engins/engins.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConducteurPage } from './pages/conducteur/conducteur.page';
import { AddEnginsComponent } from './components/add-engins/add-engins.component';
import { EditEnginsComponent } from './components/edit-engins/edit-engins.component';
import { EditConducteurPage } from './pages/conducteur/edit-conducteur/edit-conducteur.page';
import { SyntheseComponent } from './components/synthese/synthese.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { JwtModule } from '@auth0/angular-jwt';

export function getToken() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    CustomFormComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    CheckListComponent,
    EnginsComponent,
    ConducteurPage,
    AddEnginsComponent,
    EditEnginsComponent,
    EditConducteurPage,
    SyntheseComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent

  ],
  entryComponents: [EditEnginsComponent,EditConducteurPage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [
          'http://localhost:4772',
          'http://192.168.1.105:1020'
        ]
      }
    }),
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
