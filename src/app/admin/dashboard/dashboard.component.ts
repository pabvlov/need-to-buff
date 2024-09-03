import { Component, OnInit } from '@angular/core';
import { AthletesComponent } from './athletes/athletes.component';
import { CommunityService } from '../../utils/services/community.service';
import { Establishment } from '../../utils/interfaces/user-communities';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GymLandingInfo } from '../../utils/interfaces/gym-landing-info';
import { Observable } from 'rxjs';
import { UserService } from '../../utils/services/user.service';
import { User } from '../../utils/interfaces/find-users-response';
import { WorklineService } from '../../utils/services/workline.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AthletesComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  id_community: number = 0;
  id_establishment: number = 0;
  index: number = 1;
  
  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id_community = res['id_community'];
      this.id_establishment = res['id_establishment'];
      if(this.communityService.establishments.length === 0) {
        this.communityService.setGymLandingInfo(this.id_community);
        this.userService.fillUsersByEstablishment(this.id_establishment);
        this.worklineService.setWorklines();
      }
    });
  }

  constructor(private communityService: CommunityService, private route: ActivatedRoute, private userService: UserService, private worklineService: WorklineService) {
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
    }
  
}
