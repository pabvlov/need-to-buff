import { Component } from '@angular/core';
import { WarmupsComponent } from './warmups/warmups.component';
import { PlanificationService } from '../../../utils/services/planification.service';
import { ElementsComponent } from './elements/elements.component';
import { PhysicalPreparationComponent } from './physical-preparation/physical-preparation.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalService } from '../../../utils/services/swal.service';
import { CreateClassRequest } from '../../../utils/interfaces/create-class-request';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../utils/services/group.service';

@Component({
  selector: 'app-planification',
  standalone: true,
  imports: [
    CommonModule,
    WarmupsComponent,
    ElementsComponent,
    PhysicalPreparationComponent,
    ReactiveFormsModule
],
  templateUrl: './planification.component.html',
  styleUrl: './planification.component.css'
})
export class PlanificationComponent {

  id_establishment: number = 0;

  constructor(private planningService: PlanificationService,
              private fb: FormBuilder,
              private swal: SwalService,
              private route: ActivatedRoute,
              private router: Router,
              private groupsService: GroupService
  ) {
    this.route.params.subscribe(res => {
      this.id_establishment = res['id_establishment'];
    });
  }

  get classes() {
      return this.planningService.dayClasses;
  }

  get classesFromThisDate() {
      return this.planningService.dayClasses.filter((dayClass) => new Date(dayClass.start_date) > new Date());
  }

  get classesBackThisDate() {
      return this.planningService.dayClasses.filter((dayClass) => new Date(dayClass.end_date) < new Date());
  }

  get groups() {
      return this.groupsService.groups;
  }

  get date() {
      return new Date();
  }

  create = this.fb.group({
    id_group: [, [Validators.required]],
    id_user_teacher: [, [Validators.required]],
    start_date: [, [Validators.required]],
    end_date: [, [Validators.required]]
  });

  createClass() {
    if (this.create.valid) {
      const cc: CreateClassRequest = {
        id_group: this.create.value.id_group!,
        id_user_teacher: this.create.value.id_user_teacher!,
        id_planification: null,
        start_date: this.create.value.start_date!,
        end_date: this.create.value.end_date!,
        id_establishment: this.id_establishment,
        teacher_assistence: false
      };
      this.planningService.createClass(cc)
      .subscribe((data) => {
        if (data.affectedRows > 0) {
          let date = new Date();
          let yesterday = new Date(date.setDate(date.getDate() - 1));
          let tomorrow = new Date(date.setDate(date.getDate() + 2));
          this.planningService.fillDayClasses(this.id_establishment, yesterday.toISOString().split('T')[0], tomorrow.toISOString().split('T')[0]);
          this.swal.success('Listo', 'Item de Calentamiento creado con éxito');
          this.router.navigate(['/class/' + data.id_class], { skipLocationChange: false })
        }
      });
    }
  }
}
