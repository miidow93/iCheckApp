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

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'conducteur', component: ConducteurComponent, outlet: 'admin', canActivate: [AuthGuard]  },
      { path: 'synthese', component: SyntheseComponent, outlet: 'admin', canActivate: [AuthGuard] },
      { path: 'engin', component: AddEnginsComponent , outlet: 'admin', canActivate: [AuthGuard] }
    ]
  },
  //{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  // { path: 'custom', component: CustomFormComponent },
  {
    path: 'checklist/:image', component: CheckListComponent, outlet: 'main'
  },
  // { path:'conducteur',component: ConducteurPage },
  // { path:'synthese',component: SyntheseComponent},
  // { path:'engin-add',component:AddEnginsComponent },
  {
    path: 'agent', component: EnginsComponent, canActivate: [AuthGuard]},
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
