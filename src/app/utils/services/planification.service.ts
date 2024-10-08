import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DeleteWarmUp, PostWarmUp, WarmUps, WarmUpsByClass } from '../interfaces/warm-ups';
import { Observable } from 'rxjs';
import { Apparatus, ApparatusesRequest, Element, RequestCreateElement, ResponseCreateElement } from '../interfaces/element';
import { CreateClass, SimplePost } from '../interfaces/simple-post';
import { AttachClasses, Clase, GetClasses } from '../interfaces/get-classes';
import { CreateClassRequest } from '../interfaces/create-class-request';
import { GetPlanifications, PostPlanificationResponse, RequestPostPlanification } from '../interfaces/get-planifications';
import { PhysicalPreparation } from '../interfaces/physical-preparations';
@Injectable({
  providedIn: 'root'
})
export class PlanificationService {

  constructor(private http: HttpClient) { }

  warmUps: WarmUps[] = [];
  physicalPreparations: PhysicalPreparation[] = [];
  apparatuses: Apparatus[] = [];
  classes: GetClasses[] = [];
  dayClasses: GetClasses[] = [];
  planifications: GetPlanifications[] = [];

  fillClasses(id_establishment: number) {
    this.getClasses(id_establishment).subscribe((data: GetClasses[]) => {
      if (data != null) {
        this.classes = data;
      }
    });
  }

  fillDayClasses(id_establishment: number) {
    this.getDayClasses(id_establishment).subscribe((data: GetClasses[]) => {
      if (data != null) {
        this.dayClasses = data;
      } else {
        this.dayClasses = [];
      }
    }
    );
  }
  
  fillElementsByApparatus() {
    let request: ApparatusesRequest;
    request = { apparatuses: [] };
    for (let i = 1; i < 11; i++) {
      request.apparatuses.push({ id: i });
    }
    this.getElementsByApparatus(request).subscribe((data: Apparatus[]) => {
      if (data != null) {
        this.apparatuses = data;
      }
    });
  }

  fillWarmUps() {
    this.getWarmUps().subscribe((data: WarmUps[]) => {
      if (data != null) {
        this.warmUps = data;
      }
    });
  }

  fillPhysicalPreparations() {
    this.getPhysicalPreparations().subscribe((data: PhysicalPreparation[]) => {
      if (data != null) {
        this.physicalPreparations = data;
      }
    });
  }

  fillPlanifications(id_establishment: number) {
    this.getPlanifications(id_establishment).subscribe((data: GetPlanifications[]) => {
      if (data != null) {
        this.planifications = data;
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

  getElementsByApparatus(apparatus: ApparatusesRequest) {
    let body = apparatus;
    return this.http.post<Apparatus[]>(environment.apiUrl + environment.endpoints.getElements, body);
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
    return this.http.get<PhysicalPreparation[]>(environment.apiUrl + environment.endpoints.getPhysicalPreparations);
  }

  getPhysicalPreparationsByClasses(id_class: number[]) {
    return this.http.get<PhysicalPreparation[]>(environment.apiUrl + environment.endpoints.getPhysicalPreparationsByClasses + `?id_class=${id_class}`);
  }

  attachElement(id_element: number, id_element_connection: number, difficulty: string) {
    return this.http.post<SimplePost>(environment.apiUrl + environment.endpoints.attachElement, { id_element, id_element_connection, difficulty });
  }

  detachElement(id_element: number, id_element_connection: number) {
    return this.http.delete<SimplePost>(environment.apiUrl + environment.endpoints.detachElement + `?id_element=${id_element}&id_element_connection=${id_element_connection}`);
  }

  getWarmUps(): Observable<WarmUps[]> {
    return this.http.get<WarmUps[]>(environment.apiUrl + environment.endpoints.warmUps);
  }
   
  createClass(classData: CreateClassRequest): Observable<CreateClass> {
    return this.http.post<CreateClass>(environment.apiUrl + environment.endpoints.createClass, classData);
  }

  getClasses(id_establishment: number) {
    return this.http.get<GetClasses[]>(environment.apiUrl + environment.endpoints.showClasses + `?id_establishment=${id_establishment}`);
  }

  getDayClasses(id_establishment: number) {
    return this.http.get<GetClasses[]>(environment.apiUrl + environment.endpoints.showTodayClasses + `?id_establishment=${id_establishment}`);
  }

  getPlanifications(id_establishment: number): Observable<GetPlanifications[]> {
    return this.http.get<GetPlanifications[]>(environment.apiUrl + environment.endpoints.planificationShow + `?id_establishment=${id_establishment}`)
  }

  createPlanification(requestPostPlanification: RequestPostPlanification) {
    return this.http.post<PostPlanificationResponse>(environment.apiUrl + environment.endpoints.createPlanification, requestPostPlanification);
  }

  deletePlanification(id: number): Observable<SimplePost> {
    return this.http.delete<SimplePost>(environment.apiUrl + environment.endpoints.deletePlanification + `?id_planification=${id}`);
  }

  attachPlanificationToClasses(id_planification: number, classes: Clase[]) {
    let body: AttachClasses = {
      id_planification: id_planification,
      classes
    }
    return this.http.put<SimplePost>(environment.apiUrl + environment.endpoints.attachPlanificationToClasses, body);
  }








}
