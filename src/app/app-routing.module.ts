import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { CheckListComponent } from './components/check-list/check-list.component';
import { EnginsComponent } from './components/engins/engins.component';
import { AddEnginsComponent } from './components/add-engins/add-engins.component';
import { SyntheseComponent } from './components/synthese/synthese.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ConducteurComponent } from './components/conducteur/conducteur.component';
import { AddConducteurComponent } from './components/conducteur/add-conducteur/add-conducteur.component';
import { DetailsComponent } from './components/details/details.component';
import { CheckListConducteurComponent } from './components/check-list-conducteur/check-list-conducteur.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'conducteur', component: ConducteurComponent, outlet: 'admin', canActivate: [AuthGuard] },
      { path: 'conducteur/new', component: AddConducteurComponent, outlet: 'admin' },
      { path: 'synthese', component: SyntheseComponent, outlet: 'admin', canActivate: [AuthGuard] },
      { path: 'synthese/:id', component: DetailsComponent, outlet: 'admin' },
      // { path: 'engin', component: AddEnginsComponent, outlet: 'admin', canActivate: [AuthGuard] }
    ]
  },
  { path: 'checklistConducteur', component:CheckListConducteurComponent},
  { path: 'checklist/:image', component: CheckListComponent },
  { path: 'engins', component: EnginsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
  // { path: 'edit-conducteur', loadChildren: './pages/conducteur/edit-conducteur/edit-conducteur.module#EditConducteurPageModule' },


  // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
