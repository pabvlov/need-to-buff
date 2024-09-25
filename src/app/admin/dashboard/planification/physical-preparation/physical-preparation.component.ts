import { Component } from '@angular/core';
import { SwalService } from '../../../../utils/services/swal.service';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-physical-preparation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './physical-preparation.component.html',
  styleUrl: './physical-preparation.component.css'
})
export class PhysicalPreparationComponent {

  id_establishment: number = 0;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private planningService: PlanificationService,
              private swal: SwalService) 
  { 
    this.route.params.subscribe(res => {
      this.id_establishment = res['id_establishment'];
    });
  }

  createPhysicalPreparation = this.fb.group({
    name: [, [Validators.required]],
  });

  get physicalpreparations() {
    return this.planningService.physicalPreparations;
  }
  create() {
    if (this.createPhysicalPreparation.valid) {
      this.planningService.createPhysicalPreparation(this.createPhysicalPreparation.value.name!)
      .subscribe((data) => {
        if (data.affectedRows > 0) {
          this.planningService.fillPhysicalPreparations();
          this.swal.success('Listo', 'Item de Calentamiento creado con éxito');
        }
      });
    }
  }

  delete(id: number) {
    
    this.planningService.deletePhysicalPreparation(id).subscribe((data) => {
      if (data.affectedRows > 0) {
        this.planningService.fillPhysicalPreparations();
        this.swal.success('Listo', 'Item de Calentamiento eliminado con éxito');
      }
    });
  }

}
