import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';
import { InstructorComponent } from './instructor/instructor.component';
import { PersonasComponent } from './personas/personas.component';

const routes: Routes = [
  { path: 'director', component: DirectorComponent },
  { path: 'instructor', component: InstructorComponent },
  { path: 'personas', component: PersonasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
