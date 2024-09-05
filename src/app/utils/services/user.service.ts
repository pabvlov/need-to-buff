import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { FindUserResponse } from '../interfaces/find-user-response';
import { Community, UserCommunities } from '../interfaces/user-communities';
import { AthleteUser, FindUsersResponse, User } from '../interfaces/find-users-response';
import { ResponseAthlete } from '../interfaces/post-athlete';
import { CreateAthlete } from '../interfaces/create-athlete';

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

  getUserByEstablishmentId(establishmentId: number): Observable<FindUsersResponse> {
    return this.httpClient.get<FindUsersResponse>(environment.apiUrl + environment.endpoints.findUsers + `?id_establishment=${establishmentId}`)
  }

  fillUsersByEstablishment(id_establishment: number) {
    this.getUserByEstablishmentId(id_establishment).subscribe((data: FindUsersResponse) => {
      if (data != null) {
        this.usersResponse = data;
        this.athletes = [];
        data.users.forEach(user => {
          user.athletes.forEach(athlete => {
            this.athletes.push({
              id: athlete.id,
              name: athlete.name,
              lastname: athlete.lastname,
              birthdate: athlete.birthdate,
              image: athlete.image,
              work_line: athlete.work_line,
              user: user
            });
          });
        });
      }
    })
  }

  usersResponse: FindUsersResponse = {
    users: []
  }

  athletes: AthleteUser[] = [];

  get getUsers(): User[] {
    return this.usersResponse.users;
  }

  createClient(mail: string, id_establishment: number): Observable<ResponseAthlete> {
    
    return this.httpClient.post<ResponseAthlete>(environment.apiUrl + environment.endpoints.createClient, { mail, id_establishment });
  }

  createAthlete(athlete: CreateAthlete): Observable<ResponseAthlete> {    
    return this.httpClient.post<ResponseAthlete>(environment.apiUrl + environment.endpoints.createAthlete, athlete);
  }



}
