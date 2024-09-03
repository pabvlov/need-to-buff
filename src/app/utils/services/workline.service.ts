import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Worklines } from '../interfaces/worklines';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorklineService {

  constructor(private httpClient: HttpClient) { }

  getWorklines(): Observable<Worklines[]> {
    return this.httpClient.get<Worklines[]>(environment.apiUrl + environment.endpoints.worklines);
  }

  setWorklines() {
    this.getWorklines().subscribe((data: Worklines[]) => {
      if (data != null) {
        this.worklines = data;
      }
    });
  }

  worklines: Worklines[] = [];
}
