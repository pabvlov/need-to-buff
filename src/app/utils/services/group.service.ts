import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimplePost } from '../interfaces/simple-post';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseAthlete } from '../interfaces/post-athlete';
import { Group, GroupsResponse } from '../interfaces/group';
import { Difficulty } from '../interfaces/difficulty';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  groups: GroupsResponse[] = []
  difficulties: Difficulty[] = []
  
  fillGroups(id_community: number): void {
    this.getGroupsByEstablishmentId(id_community).subscribe((data: GroupsResponse[]) => {
      if (data != null) {
        this.groups = data;
      }
    })
  }
  
  getGroupsByEstablishmentId(id_community: number): Observable<GroupsResponse[]> {
    return this.httpClient.get<GroupsResponse[]>(environment.apiUrl + environment.endpoints.findGroups + `?id_community=${id_community}`)
  }
  
  addAthleteToGroup(id_group: number, id_athlete: number): Observable<SimplePost> {
    const body = {
      id_group,
      id_athlete
    }
    return this.httpClient.post<ResponseAthlete>(environment.apiUrl + environment.endpoints.addAthleteToGroup, body);
  }

  createGroup(name: string, id_establishment: number, id_difficulty_category: number): Observable<SimplePost> {
    const body = {
      name,
      id_establishment,
      id_difficulty_category
    }
    return this.httpClient.post<SimplePost>(environment.apiUrl + environment.endpoints.createGroup, body);
  }

  getDifficulties(): Observable<Difficulty[]> {
    return this.httpClient.get<Difficulty[]>(environment.apiUrl + environment.endpoints.groupDifficulty);
  }

  fillDifficulties(): void {
    this.getDifficulties().subscribe((data: Difficulty[]) => {
      if (data != null) {
        this.difficulties = data;
      }
    })
  }
}
