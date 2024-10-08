import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { CommonModule } from '@angular/common';
import { SelectWarmUp } from '../../../../utils/interfaces/warm-ups';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalService } from '../../../../utils/services/swal.service';

@Component({
  selector: 'app-select-warm-ups',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './select-warm-ups.component.html',
  styleUrl: '../select-apparatus/select-apparatus.component.css'
})
export class SelectWarmUpsComponent {

  @Input() warmUpsSelected: SelectWarmUp[] = [];
  @Output() warmUpsSelectedChanges = new EventEmitter<SelectWarmUp[]>();

  constructor(private planificationService: PlanificationService, private swal: SwalService, private fb: FormBuilder) { }

  emitWarmUpsSelected() {
    this.warmUpsSelectedChanges.emit(this.warmUpsSelected);
  }

  get warmUps() {
    return this.planificationService.warmUps;
  }

  selectWarmUp(id_warmup: number) {
    let selected = { id: id_warmup, quantity: 0, quantity_type: 0}
    return !this.isWarmUpSelected(id_warmup) ? this.warmUpsSelected.push(selected) : this.warmUpsSelected.splice(this.checkId(selected.id), 1);
  }

  checkId(id_warmup: number) {
    return this.warmUpsSelected.findIndex((warmup: SelectWarmUp) => warmup.id === id_warmup);
  }

  isWarmUpSelected(warmupId: number): boolean {
    return this.warmUpsSelected.find(w => w.id === warmupId) !== undefined;
  }

  changeQuantityType(event: Event, id_warmup: number) {
    console.log(event.target as HTMLSelectElement)
    
    if (!this.warmUpsSelected.find(w => w.id == id_warmup)) return;
    this.warmUpsSelected.find(w => w.id == id_warmup)!.quantity_type = +(event.target as HTMLSelectElement).value;
    this.emitWarmUpsSelected();
  }

  changeQuantity(event: Event, warmup_id: number) {

    console.log((event.target as HTMLInputElement).value);
    
    if (!this.warmUpsSelected.find(w => w.id == warmup_id)) return;
    this.warmUpsSelected.find(w => w.id == warmup_id)!.quantity = +(event.target as HTMLInputElement).value;
    this.emitWarmUpsSelected();
  }

  createWarmup = this.fb.group({
    name: [, [Validators.required]],
    single_name: [, [Validators.required]]
  });

  createW() {
    if (this.createWarmup.valid) {
      this.planificationService.createWarmUp(this.createWarmup.value.name!, this.createWarmup.value.single_name!)
      .subscribe((data) => {
        if (data.affectedRows > 0) {
          this.planificationService.fillWarmUps();
          this.swal.success('Listo', 'Item de Calentamiento creado con éxito');
        }
      });
    }
  }
}
