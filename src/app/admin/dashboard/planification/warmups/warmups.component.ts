import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { SwalService } from '../../../../utils/services/swal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warmups',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './warmups.component.html',
  styleUrl: './warmups.component.css'
})
export class WarmupsComponent {

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

  createWarmup = this.fb.group({
    name: [, [Validators.required]],
    single_name: [, [Validators.required]]
  });

  get warmups() {
    return this.planningService.warmUps;
  }

  create() {
    if (this.createWarmup.valid) {
      this.planningService.createWarmUp(this.createWarmup.value.name!, this.createWarmup.value.single_name!)
      .subscribe((data) => {
        if (data.affectedRows > 0) {
          this.planningService.fillWarmUps();
          this.swal.success('Listo', 'Item de Calentamiento creado con éxito');
        }
      });
    }
  }

  delete(id: number) {
    
    this.planningService.deleteWarmUp(id).subscribe((data) => {
      if (data.affectedRows > 0) {
        this.planningService.fillWarmUps();
        this.swal.success('Listo', 'Item de Calentamiento eliminado con éxito');
      }
    });
  }

}
