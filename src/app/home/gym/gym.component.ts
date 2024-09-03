import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommunityService } from '../../utils/services/community.service';
import { Banner, Community, Establishment } from '../../utils/interfaces/gym-landing-info';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../utils/services/user.service';

@Component({
  selector: 'app-gym',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.css'
})
export class GymComponent implements OnInit {

  bannerPosition = 1;
  communityId!: number;
  constructor(private route: ActivatedRoute, private communityService: CommunityService,  private location: Location, private userService: UserService) { }

  get banners(): Banner[] {
    return this.communityService.banners;
  }
  
  get community(): Community {
    return this.communityService.community;
  }
  
  get establishments(): Establishment[] {
    return this.communityService.establishments;
  }
    
  ngOnInit(): void {
    this.communityId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.communityService.setGymLandingInfo(this.communityId);
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

}
