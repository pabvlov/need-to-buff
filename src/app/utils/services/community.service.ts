import { Injectable } from '@angular/core';
import { Banner, Community, Establishment, GymLandingInfo } from '../interfaces/gym-landing-info';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient: HttpClient, private swal: SwalService) { }

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
  isLandingInfoLoaded: boolean = false;

  getGymLandingInfo(communityId: number): Observable<GymLandingInfo> {
    return this.httpClient.get<GymLandingInfo>(environment.apiUrl + environment.endpoints.communityInfo + `?id=${communityId}`)
  }

  setGymLandingInfo(communityId: number) {
    this.isLandingInfoLoaded = false;
    this.getGymLandingInfo(communityId).subscribe((data: GymLandingInfo) => {
      if (data != null) {
        this.banners = data.banners;
        this.community = data.community;
        this.establishments = data.establishments;
        this.isLandingInfoLoaded = true;
      }
    });
    
  }

  get getEstablishments(): Establishment[] {
    return this.establishments;
  }
  
  selectedEstablishment: Establishment = {
    id: 0,
    name: '',
    address: '',
    capacity: 0,
    athletes: [],
  }

  getSelectedEstablishment(id_establishment: number): Establishment {
    return this.selectedEstablishment = this.establishments.find(est => est.id === id_establishment)!;
  }

  createBanner(description: string, file: File, id_establishment: number, id_user: number): Observable<any> {
    let body = new FormData();
    body.append('description', description);
    body.append('file', file);
    body.append('id_establishment', id_establishment.toString());
    body.append('id_user', id_user.toString());
    return this.httpClient.post(environment.apiUrl + environment.endpoints.createBanner, body)
  }



}
