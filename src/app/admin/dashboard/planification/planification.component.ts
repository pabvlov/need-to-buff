import { Component, Input } from '@angular/core';
import { PlanificationService } from '../../../utils/services/planification.service';
import { CommonModule } from '@angular/common';
import { SelectApparatusComponent } from './select-apparatus/select-apparatus.component';
import { SelectAchievementsComponent } from './select-achievements/select-achievements.component';
import { Gender } from '../../../utils/interfaces/element';
import { SelectPhysicalPreparationComponent } from './select-physical-preparation/select-physical-preparation.component';
import { SelectWarmUpsComponent } from './select-warm-ups/select-warm-ups.component';
import { SelectWarmUp } from '../../../utils/interfaces/warm-ups';
import { SelectPhysicalPreparation } from '../../../utils/interfaces/physical-preparations';
import { LoadingComponent } from '../../../common/loading/loading.component';
import { Planification, PostPlanificationResponse, RequestPostPlanification } from '../../../utils/interfaces/get-planifications';
import { SelectClassesComponent } from './select-classes/select-classes.component';
import { AttachClasses, Clase, GetClasses } from '../../../utils/interfaces/get-classes';

@Component({
  selector: 'app-planification',
  standalone: true,
  imports: [
    CommonModule,
    SelectApparatusComponent,
    SelectAchievementsComponent,
    SelectWarmUpsComponent,
    SelectPhysicalPreparationComponent,
    LoadingComponent,
    SelectClassesComponent
  ],
  templateUrl: './planification.component.html',
  styleUrl: './planification.component.css'
})
export class PlanificationComponent {

  constructor(private planificationService: PlanificationService) {
   }

  stage: number = 1;
  apparatusesSelected: number[] = [];
  selectedElements: number[] = [];
  selectedWarmUps: SelectWarmUp[] = [];
  selectedPhysicalPreparations: SelectPhysicalPreparation[] = [];
  selectedClasses: number[] = [];
  planification!: Planification;
  @Input() id_establishment: number = 0;

  get planifications() {
    return this.planificationService.planifications;
  }

  get apparatusF() {
    return this.planificationService.apparatuses.filter((apparatus) => apparatus.gender == Gender.Femenino);
  }

  get apparatusM() {
    return this.planificationService.apparatuses.filter((apparatus) => apparatus.gender == Gender.Masculino);
  }

  get classes() {
    return this.planificationService.dayClasses;
  }

  request(id_establishment: number, elements: number[], warm_ups: SelectWarmUp[], physical_preparations: SelectPhysicalPreparation[]): RequestPostPlanification {
    return {
      id_establishment: +id_establishment,
      elements,
      warmups: warm_ups,
      physicalpreparations: physical_preparations
    }

  }

  next() {
    if (this.stage == 4) {
        this.stage++;
        let body = this.request(this.id_establishment, this.selectedElements, this.selectedWarmUps, this.selectedPhysicalPreparations);
        this.planificationService.createPlanification(body).subscribe((res) => {
          if (res.affectedRows === 1) {
            this.planificationService.fillPlanifications(this.id_establishment);
            this.planification = res.planification!;
            this.stage++;
            
          } else {
            this.stage--;
          }
        });
    }
    else if (this.stage == 6) {
      let classes: Clase[] = [];
      this.selectedClasses.forEach(c => {
        classes.push({ id: c });
      });

      this.planificationService.attachPlanificationToClasses(this.planification.id, classes).subscribe((res) => {
        if (res.affectedRows === 1) {
          this.planificationService.fillPlanifications(this.id_establishment);
          this.stage++;
        } else {
          this.stage--;
        }
      });
      
    }
    else this.stage++;
  }

  back() {
    this.stage--;
  }

  delete(planification_id: number) {
    this.planificationService.deletePlanification(planification_id).subscribe((res) => {
      if (res.affectedRows === 1) {
        this.planificationService.fillPlanifications(this.id_establishment);
      }
    });
  }


}
