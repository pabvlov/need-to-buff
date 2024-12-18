import { Injectable } from '@angular/core';
import { Content, Community, Establishment, GymLandingInfo } from '../interfaces/gym-landing-info';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SwalService } from './swal.service';
import { PostImage } from '../interfaces/post-image';
import { SimplePost } from '../interfaces/simple-post';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient: HttpClient, private swal: SwalService) { }

  banners: Content[] = [];
  content: Content[] = [];
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

  async setGymLandingInfo(communityId: number) {
    this.isLandingInfoLoaded = false;
    this.getGymLandingInfo(communityId).subscribe((data: GymLandingInfo) => {
      if (data != null) {
        this.banners = data.banners;
        this.community = data.community;
        this.establishments = data.establishments;
        this.content = data.content;
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

  changeProfilePicture(file: File, id_community: number): Observable<PostImage> {
    let body = new FormData();
    body.append('file', file);
    body.append('id_community', id_community.toString());
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this.httpClient.put<PostImage>(environment.apiUrl + environment.endpoints.changeLogoPicture, body, httpOptions);
  }

  getSelectedEstablishment(id_establishment: number): Establishment {
    return this.selectedEstablishment = this.establishments.find(est => est.id === id_establishment)!;
  }

  createBanner(description: string, file: File, id_establishment: number, id_user: number): Observable<PostImage> {
    
    let body = new FormData();
    body.append('description', description);
    body.append('file', file);
    body.append('id_establishment', id_establishment.toString());
    body.append('id_user', id_user.toString());
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this.httpClient.post<PostImage>(environment.apiUrl + environment.endpoints.createBanner, body, httpOptions);
  }

  /* uploadImage(this.chosenElement, this.selectedFile) */

  uploadImage(chosenElement: number, file: File): Observable<PostImage> {
    let body = new FormData();
    body.append('file', file);
    body.append('id_element', chosenElement.toString());
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this.httpClient.post<PostImage>(environment.apiUrl + environment.endpoints.uploadImage, body, httpOptions);
  }

  deleteBanner(id: number): Observable<SimplePost> {
    return this.httpClient.delete<SimplePost>(environment.apiUrl + environment.endpoints.deleteContent + `?id=${id}`);
  }

  editCommunity(id_community: number, social_reason: string, acronym: string, contact: number, facebook: string, instagram: string): Observable<SimplePost> {
    let body = {
      id_community,
      social_reason,
      acronym,
      contact,
      facebook,
      instagram
    };
    return this.httpClient.put<SimplePost>(environment.apiUrl + environment.endpoints.editCommunity, body);
  }

  editEstablishment(id_establishment: number, name: string, address: string, capacity: number): Observable<SimplePost> {
    let body = {
      id_establishment,
      name,
      address,
      capacity
    };
    return this.httpClient.put<SimplePost>(environment.apiUrl + environment.endpoints.editEstablishment, body);
  }

}
