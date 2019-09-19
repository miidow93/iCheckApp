import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'check-list', loadChildren: () => import('./pages/check-list/check-list.module').then(m => m.CheckListPageModule) },
  { path: 'tracteur', loadChildren: './pages/tracteur/tracteur.module#TracteurPageModule' },
  { path: 'attelage', loadChildren: './pages/attelage/attelage.module#AttelagePageModule' },
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
