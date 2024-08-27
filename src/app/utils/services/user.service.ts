import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { FindUserResponse } from '../interfaces/find-user-response';
import { Community, UserCommunities } from '../interfaces/user-communities';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserByMail(mail: string): Observable<FindUserResponse> {
      // http get request but I don't want to return the observable, I want to return the data
      return this.httpClient.get<FindUserResponse>(environment.apiUrl + environment.endpoints.findUser + `?mail=${mail}`).pipe(
        tap(resp => {
          return resp;
        }),
        map(resp => resp) // Return the desired data from the response
      );
        
    }

  getCommunitiesByAthleteId(athleteId: number): Observable<UserCommunities> {
    return this.httpClient.get<UserCommunities>(environment.apiUrl + environment.endpoints.userCommunities + `?id=${athleteId}`)
  }

  communities: Community[] = [] 
  

  getCommunities() {
    this.getCommunitiesByAthleteId(4).subscribe((data: UserCommunities) => {      
      if (data != null) {
        this.communities = data.communities;
      }});

  }


}
