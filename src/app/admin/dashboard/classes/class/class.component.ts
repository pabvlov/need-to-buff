import { Component, Input, Output } from '@angular/core';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {

  @Input() idClass!: number;

  constructor(private planificationService: PlanificationService) {}

  get class() {
    return this.planificationService.dayClasses.find(c => c.id == this.idClass)
  }
}
