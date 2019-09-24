import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CustomFormComponent } from './components/custom-form/custom-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'check-list', loadChildren: () => import('./pages/check-list/check-list.module').then(m => m.CheckListPageModule) },
  { path: 'conducteur', loadChildren: './pages/conducteur/conducteur.module#ConducteurPageModule' },
  { path: 'tracteur', loadChildren: './pages/tracteur/tracteur.module#TracteurPageModule' },
  { path: 'test', loadChildren: () => import('./pages/conducteur/conducteur.module').then(m => m.ConducteurPageModule) },
  { path: 'attelage', loadChildren: './pages/attelage/attelage.module#AttelagePageModule' },
  { path: 'custom', component: CustomFormComponent },
  { path: '**', redirectTo: 'home' },

  // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
