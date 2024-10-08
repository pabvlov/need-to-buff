import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Planification } from '../../../../utils/interfaces/get-planifications';
import { CommonModule } from '@angular/common';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { GetClasses } from '../../../../utils/interfaces/get-classes';

@Component({
  selector: 'app-select-classes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './select-classes.component.html',
  styleUrl: './select-classes.component.css'
})
export class SelectClassesComponent {

  @Input() classesSelected: number[] = [];
  @Output() classesSelectedChanges = new EventEmitter<number[]>();
  @Input() id_establishment!: number;
  @Input() planification!: Planification;
  @Input() classes: GetClasses[] = [];
  
  emitClassesSelected() {
    this.classesSelectedChanges.emit(this.classesSelected);
  }

  selectClass(id_class: number) {
    return !this.isClassSelected(id_class) ? this.classesSelected.push(id_class) : this.classesSelected.splice(this.checkId(id_class), 1);
  }

  isClassSelected(classId: number): boolean {
    return this.classesSelected.find(c => c === classId) !== undefined;
  }

  checkId(id_class: number) {
    return this.classesSelected.findIndex((classId: number) => classId === id_class);
  }






}
