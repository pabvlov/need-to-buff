import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {

  // cliente = 1
  // atleta = 2

  selected = 1;

  constructor(private fb: FormBuilder) {}

  clientRegister = this.fb.group({
    name: [''],
    lastName: [''],
    mail: [''],
    contact: [''],
    birthdate: [''],
    gender: [''],
  })

  get client() {
    return this.clientRegister.controls
  }

}
