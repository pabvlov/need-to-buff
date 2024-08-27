import { Injectable } from '@angular/core';
import { Banner, Community, Establishment, GymLandingInfo } from '../interfaces/gym-landing-info';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient: HttpClient) { }

  banners: Banner[] = [];
  community: Community = {
    razon_social: '',
    acronym: '',
    logo: '',
    contact: 0,
    instagram: '',
    facebook: '',
    description: ''
  };
  establishments: Establishment[] = [];

  getGymLandingInfo(communityId: number): Observable<GymLandingInfo> {
    return this.httpClient.get<GymLandingInfo>(environment.apiUrl + environment.endpoints.communityInfo + `?id=${communityId}`)
  }

  setGymLandingInfo(communityId: number) {
    this.getGymLandingInfo(communityId).subscribe((data: GymLandingInfo) => {
      console.log(data);
      
      if (data != null) {
        this.banners = data.banners;
        this.community = data.community;
        this.establishments = data.establishments;
      }
    });
  }

  



}
