import { NgModule } from '@angular/core';
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
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { CheckListComponent } from './components/check-list/check-list.component';
import { EnginsComponent } from './components/engins/engins.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEnginsComponent } from './components/add-engins/add-engins.component';
import { EditEnginsComponent } from './components/edit-engins/edit-engins.component';
import { SyntheseComponent } from './components/synthese/synthese.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { JwtModule } from '@auth0/angular-jwt';
import { EditConducteurComponent } from './components/conducteur/edit-conducteur/edit-conducteur.component';
import { ConducteurComponent } from './components/conducteur/conducteur.component';
import { AddConducteurComponent } from './components/conducteur/add-conducteur/add-conducteur.component';
import { DetailsComponent } from './components/details/details.component';
import { CheckListConducteurComponent } from './components/check-list-conducteur/check-list-conducteur.component';
import { CheckListEquipementComponent } from './components/check-list-equipement/check-list-equipement.component';
import { CheckListEnginComponent } from './components/check-list-engin/check-list-engin.component';
import { CiterneComponent } from './components/attelages/citerne/citerne.component';
import { BenneComponent } from './components/attelages/benne/benne.component';
import { PlateauComponent } from './components/attelages/plateau/plateau.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HistoryComponent } from './components/history/history.component';
import { UploadComponent } from './components/upload/upload.component';
import { Camera } from '@ionic-native/camera/ngx';
import { ChartsModule } from 'ng2-charts';
import { UserComponent } from './components/user/user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { QrGeneratorComponent } from './components/qr-generator/qr-generator.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { ListVehiculeComponent } from './components/vehicule/list-vehicule/list-vehicule.component';
import { NgxPrintModule } from 'ngx-print';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EditVehiculeComponent } from './components/vehicule/edit-vehicule/edit-vehicule.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';



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
    AddEnginsComponent,
    EditEnginsComponent,
    SyntheseComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent,
    EditConducteurComponent,
    ConducteurComponent,
    AddConducteurComponent,
    DetailsComponent,
    CheckListConducteurComponent,
    CheckListEquipementComponent,
    CheckListEnginComponent,
    BenneComponent,
    CiterneComponent,
    PlateauComponent,
    DashboardComponent,
    HistoryComponent,
    UploadComponent,
    UserComponent,
    ListUserComponent,
    QrGeneratorComponent,
    VehiculeComponent,
    ListVehiculeComponent,
    EditVehiculeComponent,
    EditUserComponent

  ],

  entryComponents: [EditEnginsComponent,EditConducteurComponent,EditVehiculeComponent,EditUserComponent],

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
    FontAwesomeModule,
    ChartsModule,
    NgxPrintModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [
          'http://localhost:4772',
          'http://192.168.1.105:1020'
        ]
      }
    }),
    NgxQRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],

  providers: [
    Camera,
    BarcodeScanner,
    ScreenOrientation,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    FileTransfer,
    FileOpener
  ],
  bootstrap: [AppComponent],
  exports: [],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
