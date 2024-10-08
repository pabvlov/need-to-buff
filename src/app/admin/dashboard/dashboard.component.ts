import { Component, OnInit } from '@angular/core';
import { AthletesComponent } from './athletes/athletes.component';
import { CommunityService } from '../../utils/services/community.service';
import { Establishment } from '../../utils/interfaces/user-communities';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../utils/services/user.service';
import { WorklineService } from '../../utils/services/workline.service';
import { GroupsComponent } from './groups/groups.component';
import { GroupService } from '../../utils/services/group.service';
import { ClassesComponent } from './classes/classes.component';
import { PlanificationService } from '../../utils/services/planification.service';
import { ExercisesComponent } from './exercises/exercises.component';
import { PlanificationComponent } from './planification/planification.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AthletesComponent,
    GroupsComponent,
    ClassesComponent,
    CommonModule,
    RouterModule,
    ExercisesComponent,
    PlanificationComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  id_community: number = 0;
  id_establishment: number = 0;
  index: number = 1;
  show: string = 'dashboard';
  
  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id_community = res['id_community'];
      this.id_establishment = res['id_establishment'];
      if(this.communityService.establishments.length === 0) {
        this.communityService.setGymLandingInfo(this.id_community);
        this.planificationService.fillDayClasses(this.id_establishment);
        this.planificationService.fillWarmUps();
        this.planificationService.fillElementsByApparatus();
        this.planificationService.fillPhysicalPreparations();
        this.planificationService.fillClasses(this.id_establishment);    
        this.planificationService.fillPlanifications(this.id_establishment);   
        this.worklineService.setWorklines();
        this.groupService.fillGroups(this.id_establishment);
        this.groupService.fillDifficulties();
        this.userService.fillUsersByEstablishment(this.id_establishment);
      }
    });
  }

  constructor(private communityService: CommunityService, 
              private route: ActivatedRoute, 
              private userService: UserService, 
              private worklineService: WorklineService,
              private groupService: GroupService,
              private planificationService: PlanificationService) {
    this.route.params.subscribe(res => {
      this.id_community = res['id_community'];
      this.id_establishment = res['id_establishment'];
    });
   }

    get establishments(): Establishment[] {
        return this.communityService.getEstablishments;
    }

    updateEstablishment(id_establishment: number) {
        this.id_establishment = id_establishment;
    } 

    get getSelectedEstablishment(): Establishment {
      return this.communityService.getSelectedEstablishment(this.id_establishment);
    }

    update() {
      this.userService.fillUsersByEstablishment(this.id_establishment);
      this.groupService.fillGroups(this.id_establishment);
    }
  
}
