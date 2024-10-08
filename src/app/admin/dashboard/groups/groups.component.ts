import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../utils/services/user.service';
import { AthleteUser } from '../../../utils/interfaces/find-users-response';
import { SwalService } from '../../../utils/services/swal.service';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../utils/services/group.service';
import { PlanificationService } from '../../../utils/services/planification.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent {

  editingGroup: number = 0;
  id_establishment: number = 0;

  constructor(private userService: UserService, 
              private fb: FormBuilder, 
              private swal: SwalService, 
              private route: ActivatedRoute,
              private groupService: GroupService,
              private planningService: PlanificationService) {
    this.route.params.subscribe(res => {
      this.id_establishment = res['id_establishment'];
    });
   }

  get groups() {
    return this.groupService.groups;
  }

  get athletes(): AthleteUser[] {
    return this.userService.athletes
  }

  get difficulties() {
    return this.groupService.difficulties;
  }

  addAthlete = this.fb.group({
    id_athlete: [, [Validators.required]],
    id_group: [0, [Validators.required]]
  });

  createGroup = this.fb.group({
    name: [, [Validators.required]],
    id_difficulty: [0, [Validators.required]]
  });

  add() {
    if (this.addAthlete.valid) {
      this.groupService.addAthleteToGroup(this.editingGroup, parseInt(this.addAthlete.value.id_athlete!)
      ).subscribe((data) => {
        if (data.affectedRows > 0) {
          this.groupService.fillGroups(this.id_establishment);
          this.swal.success('Listo', 'Atleta agregado al grupo');
        }
      });
    }
    
  }

  updateGroup(id_group: number): void {
    this.editingGroup = id_group;
  }

  create() {
    if (this.createGroup.valid) {
      this.groupService.createGroup(this.createGroup.value.name!, this.id_establishment, parseInt(this.createGroup.value.id_difficulty!.toString())
      ).subscribe((data) => {
        if (data.affectedRows > 0) {
          this.groupService.fillGroups(this.id_establishment);
          this.swal.success('Listo', 'Grupo creado con éxito');
        }
      });
    }
  }
}
