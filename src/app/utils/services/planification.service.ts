import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DeleteWarmUp, PostWarmUp, WarmUps, WarmUpsByClass } from '../interfaces/warm-ups';
import { Observable } from 'rxjs';
import { ElementsByApparatus, RequestCreateElement, ResponseApparatus, ResponseCreateElement, ResponseElements } from '../interfaces/element';
import { CreateClass, SimplePost } from '../interfaces/simple-post';
import { GetClasses } from '../interfaces/get-classes';
import { CreateClassRequest } from '../interfaces/create-class-request';

@Injectable({
  providedIn: 'root'
})
export class PlanificationService {

  constructor(private http: HttpClient) { }

  warmUps: WarmUps[] = [];
  physicalPreparations: WarmUps[] = [];
  apparatus: ResponseApparatus[] = [];
  elementsByApparatus: ElementsByApparatus[] = [];
  classes: GetClasses[] = [];
  dayClasses: GetClasses[] = [];
  selectedElements: ElementsByApparatus = {
    id_apparatus: 0,
    elements: []
  };

  fillClasses(id_establishment: number) {
    this.getClasses(id_establishment).subscribe((data: GetClasses[]) => {
      if (data != null) {
        this.classes = data;
      }
    });
  }

  fillDayClasses(id_establishment: number, start_date: string, end_date: string) {
    this.getDayClasses(id_establishment, start_date, end_date).subscribe((data: GetClasses[]) => {
      if (data != null) {
        this.dayClasses = data;
      } else {
        this.dayClasses = [];
      }
    }
    );
  }

  fillApparatusAndElements() {
    this.getAllApparatus().subscribe((data: ResponseApparatus[]) => {
      if (data != null) {
        this.apparatus = data;
        this.fillElements();
      }
    });
  }

  fillElements() {
    this.elementsByApparatus = [];
    this.apparatus.forEach(a => {
      this.getElementsByApparatus(a.id).subscribe({
        next: (data: ResponseElements[]) => {
          if (data != null) {
            console.log(this.elementsByApparatus.find(el => el.id_apparatus == data[0].apparatus.id) != null);
            
              this.elementsByApparatus.push({
                id_apparatus: data[0].apparatus.id,
                elements: data
              });
          }
        },
        error: (error: any) => {
          
        }
      });
    });    
  }

  fillSelectedElements(id_apparatus: number) {
    this.selectedElements = this.elementsByApparatus.find(el => el.id_apparatus == id_apparatus)!;
    console.log(this.selectedElements);
    
  }

  fillWarmUps() {
    this.getWarmUps().subscribe((data: WarmUps[]) => {
      if (data != null) {
        this.warmUps = data;
      }
    });
  }

  fillPhysicalPreparations() {
    this.getPhysicalPreparations().subscribe((data: WarmUps[]) => {
      if (data != null) {
        this.physicalPreparations = data;
      }
    });
  }

  getWarmUpsByClass(id_class: number): Observable<WarmUpsByClass[]> {
    return this.http.get<WarmUpsByClass[]>(environment.apiUrl + environment.endpoints.warmUpsByClass + `?id_class=${id_class}`);
  }

  createWarmUp(name: string, single_name: string) {
    const data = { name, single_name }
    return this.http.post<PostWarmUp>(environment.apiUrl + environment.endpoints.createWarmUp, data);
  }

  deleteWarmUp(id: number) {
    return this.http.delete<DeleteWarmUp>(environment.apiUrl + environment.endpoints.deleteWarmUp + `?id_warmup=${id}`);
  }

  getElementsByApparatus(apparatus: number) {
    return this.http.get<ResponseElements[]>(environment.apiUrl + environment.endpoints.getElements + `?id_apparatus=${apparatus}`);
  }

  createElement(req: RequestCreateElement) {
    return this.http.post<ResponseCreateElement>(environment.apiUrl + environment.endpoints.createElement, req);
  }

  deleteElement(id: number) {
    return this.http.delete(environment.apiUrl + environment.endpoints.deleteElement + `?id_element=${id}`);
  }

  createPhysicalPreparation(name: string) {
    return this.http.post<SimplePost>(environment.apiUrl + environment.endpoints.createPhysicalPreparation, { name });
  }

  deletePhysicalPreparation(id: number) {
    return this.http.delete<SimplePost>(environment.apiUrl + environment.endpoints.deletePhysicalPreparation + `?id_physical_preparation=${id}`);
  }

  getPhysicalPreparations() {
    return this.http.get<ResponseElements[]>(environment.apiUrl + environment.endpoints.getPhysicalPreparations);
  }

  getPhysicalPreparationsByClasses(id_class: number[]) {
    return this.http.get<ResponseElements[]>(environment.apiUrl + environment.endpoints.getPhysicalPreparationsByClasses + `?id_class=${id_class}`);
  }

  attachElement(id_element: number, id_element_connection: number, difficulty: string) {
    return this.http.post<SimplePost>(environment.apiUrl + environment.endpoints.attachElement, { id_element, id_element_connection, difficulty });
  }

  detachElement(id_element: number, id_element_connection: number) {
    return this.http.delete<SimplePost>(environment.apiUrl + environment.endpoints.detachElement + `?id_element=${id_element}&id_element_connection=${id_element_connection}`);
  }

  getAllApparatus() {
    return this.http.get<ResponseApparatus[]>(environment.apiUrl + environment.endpoints.getApparatus);
  }

  getWarmUps(): Observable<WarmUps[]> {
    return this.http.get<WarmUps[]>(environment.apiUrl + environment.endpoints.warmUps);
  }

  getElements(): Observable<ResponseElements[]> {
    return this.http.get<ResponseElements[]>(environment.apiUrl + environment.endpoints.getElements);
  }
   
  createClass(classData: CreateClassRequest): Observable<CreateClass> {
    return this.http.post<CreateClass>(environment.apiUrl + environment.endpoints.createClass, classData);
  }

  getClasses(id_establishment: number) {
    return this.http.get<GetClasses[]>(environment.apiUrl + environment.endpoints.showClasses + `?id_establishment=${id_establishment}`);
  }

  getDayClasses(id_establishment: number, start_date: string, end_date: string) {
    return this.http.get<GetClasses[]>(environment.apiUrl + environment.endpoints.showClassesByDates + `?id_establishment=${id_establishment}&start_date=${start_date}&end_date=${end_date}`);
  }










}
