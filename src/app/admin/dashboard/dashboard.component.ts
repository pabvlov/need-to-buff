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
import { ClassComponent } from './classes/class/class.component';
import {MatFormField, MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScreenLoadingComponent } from '../../common/screen-loading/screen-loading.component';
import {MatChipsModule} from '@angular/material/chips';
import { BannersComponent } from './banners/banners.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MatIconModule } from '@angular/material/icon';

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
    PlanificationComponent,
    ClassComponent,
    MatSelectModule,
    MatFormFieldModule,
    ScreenLoadingComponent,
    MatChipsModule,
    BannersComponent,
    ConfigurationComponent,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  id_community: number = 0;
  id_establishment: number = 0;
  index: number = 1;
  show: string = 'dashboard';
  classSelected: number = 1;
  
  ngOnInit(): void {
    
  }

  onClassSelectedChanges(selectedClass: number) {
    this.classSelected = selectedClass;
  }

  // Este método se ejecuta cuando el hijo emite un cambio en "show"
  onShowChanges(show: string) {
    this.show = show;
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

    this.route.params.subscribe(res => {
      this.id_community = res['id_community'];
      this.id_establishment = res['id_establishment'];
      if(this.communityService.establishments.length === 0) {
        this.communityService.setGymLandingInfo(this.id_community);
        this.planificationService.fillDayClasses(this.id_community);
        this.planificationService.fillWarmUps();
        this.planificationService.fillElementsByApparatus();
        this.planificationService.fillPhysicalPreparations(); 
        this.planificationService.fillPlanifications(this.id_establishment);   
        this.worklineService.setWorklines();
        this.groupService.fillGroups(this.id_community);
        this.groupService.fillDifficulties();
        this.userService.fillUsersByCommunity(this.id_community);
      }
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

    get selectedClass() {
      return this.classSelected;
    }

    get isDataLoaded(): boolean {
      return this.planificationService.isAllDataLoaded;
    }

    get athletes() {
      return this.userService.athletes;
    }

    get users() {
      return this.userService.getUsers.establishments.filter(u => u.id_establishment == this.id_establishment)
    }

    get worklines() {
      return this.worklineService.worklines;
    }

    get groups() {
      return this.groupService.groups;
    }

    get difficulties() {
      return this.groupService.difficulties;
    }

    get banners() {
      return this.communityService.banners;
    }

    get community() {
      return this.communityService.community;
    }

  
}
