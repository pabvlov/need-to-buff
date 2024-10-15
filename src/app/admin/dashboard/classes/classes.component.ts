import { Component, EventEmitter, Input, LOCALE_ID, Output } from '@angular/core';
import { PlanificationService } from '../../../utils/services/planification.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalService } from '../../../utils/services/swal.service';
import { CreateClassRequest } from '../../../utils/interfaces/create-class-request';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GroupService } from '../../../utils/services/group.service';
import { UserService } from '../../../utils/services/user.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

  id_establishment: number = 0;
  
  @Input() show!: string;
  @Input() classSelected!: number;
  @Output() showChanges = new EventEmitter<string>();
  @Output() classSelectedChanges = new EventEmitter<number>();

  constructor(private planningService: PlanificationService,
              private fb: FormBuilder,
              private swal: SwalService,
              private route: ActivatedRoute,
              private groupsService: GroupService,
              private userService: UserService
  ) {
    this.route.params.subscribe(res => {
      this.id_establishment = res['id_establishment'];
    });
  }

  // Método para emitir cambios en "show"
  changeShow(newShow: string) {
    this.show = newShow;
    this.showChanges.emit(this.show);
  }

  // Método para emitir cambios en "classSelected"
  changeClassSelected(newClassSelected: number) {
    this.classSelected = newClassSelected;
    this.classSelectedChanges.emit(this.classSelected);
    console.log(this.classSelected);
    
  }

  change(id: number) {
    this.changeClassSelected(id); 
    this.changeShow("class");
  }

  get classes() {
      return this.planningService.dayClasses;
  }

  get actualClass() {     
      return this.planningService.dayClasses.filter((dayClass) => {
        const now = new Date(), nowMinutes = now.getHours() * 60 + now.getMinutes();
        const startMinutes = new Date(dayClass.start_date).getHours() * 60 + new Date(dayClass.start_date).getMinutes();
        const endMinutes = new Date(dayClass.end_date).getHours() * 60 + new Date(dayClass.end_date).getMinutes();
        
        return startMinutes <= nowMinutes && endMinutes >= nowMinutes;
      });
  }

  get classesFromThisDate() {
    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    return this.planningService.dayClasses.filter((dayClass) => {
        const startMinutes = new Date(dayClass.start_date).getHours() * 60 + new Date(dayClass.start_date).getMinutes();
        return startMinutes >= nowMinutes;
    });
}

get classesBackThisDate() {
    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    return this.planningService.dayClasses.filter((dayClass) => {
        const endMinutes = new Date(dayClass.end_date).getHours() * 60 + new Date(dayClass.end_date).getMinutes();
        return endMinutes < nowMinutes;
    });
}
  get teachers() {
      return this.userService.getUsers.filter((user) => user.roles.length > 0);
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
    end_date: [, [Validators.required]],
    id_period: [, [Validators.required]],
    date_period_end: [0, [Validators.required]]
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
        teacher_assistence: false,
        id_period: this.create.value.id_period!,
        date_period_end: this.create.value.date_period_end!
      };
      this.planningService.createClass(cc)
      .subscribe((data) => {
        if (data.affectedRows > 0) {
          this.planningService.fillDayClasses(this.id_establishment);
          this.swal.success('Listo', 'La clase se creó con éxito, espera a ser redireccionado');
          /* this.router.navigate(['/admin/class/' + data.id_class], { skipLocationChange: true }) */
        }
      });
    }
  }
}
