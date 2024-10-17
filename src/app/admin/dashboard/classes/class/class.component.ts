import { Component, Input, Output } from '@angular/core';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../../utils/services/swal.service';

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
  checkedAthletes: number[] = [];

  constructor(private planificationService: PlanificationService, private swal: SwalService) {}

  get class() {
    return this.planificationService.dayClasses.flatMap(establishment => establishment.classes).find(c => c.id == this.idClass)
  }

  checkAthlete(id: number) {
    if (this.checkedAthletes.includes(id)) {
      this.checkedAthletes = this.checkedAthletes.filter((a) => a != id);
    } else {
      this.checkedAthletes.push(id);
    }
  }

  save() {
    this.swal.loading('Guardando asistencia')
    this.planificationService.checkPresence(this.idClass, this.checkedAthletes).subscribe({
      
      error: (err) => {
        this.swal.error('Error', err.error.message);
      },
      next: () => {
        this.planificationService.fillDayClasses(this.class?.id_establishment!);
        this.swal.success('Éxito','Asistencia guardada');
      }
    });
  }

  areAthletesChecked() {
    /* search by today's date in presence dates */
    
    return this.class?.presences.find((p) => new Date(p.date).toDateString() == new Date().toDateString()) !== undefined;
  }
}
