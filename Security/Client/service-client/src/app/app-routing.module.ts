import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SecurityListComponent} from './components/security-list/security-list.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'dashboard', component: DashboardComponent},
  { path: '', component: SecurityListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
