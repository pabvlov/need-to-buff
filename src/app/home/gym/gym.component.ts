import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommunityService } from '../../utils/services/community.service';
import { Content, Community, Establishment } from '../../utils/interfaces/gym-landing-info';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../utils/services/user.service';
import { ScreenLoadingComponent } from '../../common/screen-loading/screen-loading.component';
import { PlanificationService } from '../../utils/services/planification.service';
import { WorklineService } from '../../utils/services/workline.service';
import { GroupService } from '../../utils/services/group.service';
import { environment } from '../../environments/environment';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import { ProfileMenuComponent } from '../../common/profile-menu/profile-menu.component';
import { AuthService } from '../../utils/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-gym',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ScreenLoadingComponent,
    MatTabsModule,
    MatProgressBarModule,
    MatChipsModule,
    ProfileMenuComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.css'
})
export class GymComponent implements OnInit {

  bannerPosition = 1;
  communityId!: number;
  comment: string = '';
  file: File | null = null;
  constructor(private route:                ActivatedRoute, 
              private communityService:     CommunityService,  
              private location:             Location, 
          private userService:              UserService,
              private planificationService: PlanificationService,
              private groupService:         GroupService,
              private worklineService:      WorklineService,
              private authService:          AuthService
            ) {
              this.authService.renewSession();
             }

  get banners(): Content[] {
    return this.communityService.banners;
  }
  
  get community(): Community {
    return this.communityService.community;
  }
  
  get establishments(): Establishment[] {
    return this.communityService.establishments;
  }

  get isLandingInfoLoaded(): boolean {
    return this.communityService.isLandingInfoLoaded;
  }

  get comments() {
    return this.communityService.content;
  }

  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          this.file = input.files[0];
      }
  }
    
  ngOnInit(): void {
    this.communityId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.communityService.setGymLandingInfo(this.communityId);
  }

  setComment($event: Event) {
    
    this.comment = ($event.target as HTMLInputElement).value;
  }

  volver() {
    this.location.back();
  }

  next() {
    console.log(this.bannerPosition);
    
    if (this.bannerPosition === this.banners.length) {
      this.bannerPosition = 1;
    } else this.bannerPosition++;
  }

  back() {
    if (this.bannerPosition === 1) {
      this.bannerPosition = this.banners.length
    } else this.bannerPosition--;
  }

  load() {
    let establishments: number[] = []
    this.establishments.forEach(e => {
      establishments.push(e.id);
    });
    this.planificationService.fillDayClasses(this.communityId);
        this.planificationService.fillWarmUps();
        this.planificationService.fillElementsByApparatus();
        this.planificationService.fillPhysicalPreparations(); 
        this.planificationService.fillPlanifications(this.establishments[0].id);   
        this.worklineService.setWorklines();
        this.groupService.fillGroups(this.establishments[0].id);
        this.groupService.fillDifficulties();
        this.userService.fillUsersByCommunity(this.communityId);
  }

  get bannerImagePath() {
    return environment.apiUrl + '/banners/';
  }

  get contentImagePath() {
    return environment.apiUrl + '/content/';
  }

  isImage(url: string) {
    return url.toLocaleLowerCase()!.match(/\.(jpeg|jpg|gif|png)$/)  != null;
  }

  get isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  doComment() {
    console.log(this.comment);
    this.planificationService.createComment(this.comment, this.authService.getUserId(), this.communityId, this.file!).subscribe({
      next: (response) => {
        if (response.affectedRows == 2) {
          this.comment = '';
          this.file = null;
        }
      },
      error: (error) => {
        console.error('Error creating comment', error);
      }
    });
  }
}
