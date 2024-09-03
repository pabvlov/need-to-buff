import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';
import { InstructorComponent } from './instructor/instructor.component';
import { PersonasComponent } from './personas/personas.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'director', component: DirectorComponent },
  { path: 'instructor', component: InstructorComponent },
  { path: 'personas', component: PersonasComponent },
  { path: 'dashboard/:id_community', component: DashboardComponent },
  { path: 'dashboard/:id_community/:id_establishment', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
