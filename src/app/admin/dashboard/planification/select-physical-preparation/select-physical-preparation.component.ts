import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { CommonModule } from '@angular/common';
import { SelectPhysicalPreparation } from '../../../../utils/interfaces/physical-preparations';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalService } from '../../../../utils/services/swal.service';

@Component({
  selector: 'app-select-physical-preparation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './select-physical-preparation.component.html',
  styleUrl: '../select-apparatus/select-apparatus.component.css'
})
export class SelectPhysicalPreparationComponent {

  @Input() physicalPreparationsSelected: SelectPhysicalPreparation[] = [];
  @Output() physicalPreparationsSelectedChanges = new EventEmitter<SelectPhysicalPreparation[]>();

  constructor(private planificationService: PlanificationService, private swal: SwalService, private fb: FormBuilder) { }

  emitPhysicalPreparationsSelected() {
    this.physicalPreparationsSelectedChanges.emit(this.physicalPreparationsSelected);
  }

  get physicalPreparations() {
    return this.planificationService.physicalPreparations;
  }

  selectPhysicalPreparation(id_physicalprep: number) {
    let selected = { id: id_physicalprep, quantity: 0, quantity_type: 0}
    return !this.isPhysicalPreparationSelected(id_physicalprep) ? this.physicalPreparationsSelected.push(selected) : this.physicalPreparationsSelected.splice(this.checkId(selected.id), 1);
  }

  isPhysicalPreparationSelected(warmupId: number): boolean {
    return this.physicalPreparationsSelected.find(w => w.id === warmupId) !== undefined;
  }

  checkId(id_physicalprep: number) {
    return this.physicalPreparationsSelected.findIndex((physical_preparation: SelectPhysicalPreparation) => physical_preparation.id === id_physicalprep);
  }

  changeQuantityType(event: Event, id_warmup: number) {
    console.log(event.target as HTMLSelectElement)
    
    if (!this.physicalPreparationsSelected.find(w => w.id == id_warmup)) return;
    this.physicalPreparationsSelected.find(w => w.id == id_warmup)!.quantity_type = +(event.target as HTMLSelectElement).value;
    this.emitPhysicalPreparationsSelected();
  }

  changeQuantity(event: Event, warmup_id: number) {

    console.log((event.target as HTMLInputElement).value);
    
    if (!this.physicalPreparationsSelected.find(w => w.id == warmup_id)) return;
    this.physicalPreparationsSelected.find(w => w.id == warmup_id)!.quantity = +(event.target as HTMLInputElement).value;
    this.emitPhysicalPreparationsSelected();
  }

  createPhysicalPreparation = this.fb.group({
    name: [, [Validators.required]],
  });

  createPP() {
    if (this.createPhysicalPreparation.valid) {
      this.planificationService.createPhysicalPreparation(this.createPhysicalPreparation.value.name!)
      .subscribe((data) => {
        if (data.affectedRows > 0) {
          this.planificationService.fillPhysicalPreparations();
          this.swal.success('Listo', 'Item de Calentamiento creado con éxito');
        }
      });
    }
  }
}
