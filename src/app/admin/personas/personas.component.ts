import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {

  // cliente = 1
  // atleta = 2

  selected = 1;



}
