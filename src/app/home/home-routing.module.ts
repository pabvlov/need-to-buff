import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChooseGymLandingComponent } from './choose-gym-landing/choose-gym-landing.component';
import { GymComponent } from './gym/gym.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'choose', component: ChooseGymLandingComponent},
  { path: 'gym/:id', component: GymComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
