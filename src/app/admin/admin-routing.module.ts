import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassComponent } from './dashboard/classes/class/class.component';

const routes: Routes = [
  { path: 'dashboard/:id_community', component: DashboardComponent },
  { path: 'dashboard/:id_community/:id_establishment', component: DashboardComponent },
  { path: 'class/:id_class', component: ClassComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
