import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SecurityListComponent} from './components/security-list/security-list.component';
import { SecurityDetailsComponent } from './components/security-list/security-details/security-details.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'dashboard', component: DashboardComponent},
  { path: '', component: SecurityListComponent },
  { path: 'securityDetails/:id', component: SecurityDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
