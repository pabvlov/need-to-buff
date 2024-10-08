import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Apparatus } from '../../../../utils/interfaces/element';

@Component({
  selector: 'app-select-apparatus',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './select-apparatus.component.html',
  styleUrl: './select-apparatus.component.css'
})
export class SelectApparatusComponent {
  @Input() machineSelected!: number[];
  @Input() apparatusM!: Apparatus[];
  @Input() apparatusF!: Apparatus[];
  @Output() machineSelectedChanges = new EventEmitter<number[]>();
  @Output() stageChanges = new EventEmitter<number>();

  emitMachineSelected() {
    this.machineSelectedChanges.emit(this.machineSelected);
  }

  save(stage: number) {
    this.stageChanges.emit(stage);
  }

  selectApparatus(id_apparatus: number) {
    return !this.machineSelected.includes(id_apparatus) ? this.machineSelected.push(id_apparatus) : this.machineSelected.splice(this.machineSelected.indexOf(id_apparatus), 1);
  }
}
