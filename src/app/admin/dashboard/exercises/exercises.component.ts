import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WarmupsComponent } from './warmups/warmups.component';
import { ElementsComponent } from './elements/elements.component';
import { PhysicalPreparationComponent } from './physical-preparation/physical-preparation.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    RouterModule,
    WarmupsComponent,
    ElementsComponent,
    PhysicalPreparationComponent,
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {

}
