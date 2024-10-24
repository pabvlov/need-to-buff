import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Session } from '../interfaces/session';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(Router) private router: Router, private httpClient: HttpClient) { }

  public _usuario: User = { // usuario que se loguea
    id: 0,
    mail: '',
    name: '',
    lastname: '',
    gender: '',
    contact: 0
  }

  public loggedIn: boolean = false;

  public isAuthenticated(): boolean { // método para saber si el usuario está logueado
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      return !helper.isTokenExpired(token);
    }
    return false;
  }

  logout() { // removemos token jwt del localstorage, por lo tanto desloguea al usuario y lo manda al inicio
    localStorage.removeItem('token')
    this.router.navigate(['/'], { skipLocationChange: false });
    window.location.reload();
  }

  loginUser(mail: string, password: string) { // loguear al usuario
    const url = environment.apiUrl + environment.endpoints.login

    return this.httpClient.post<Session>(url, { mail, password })
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.content.token!) // guardamos el jwt en localstorage
          this._usuario = resp.content.user // le asignamos al usuario la response
          this.loggedIn = true; // seteamos la variable loggedIn a true
        }),
        map(resp => resp)
      )
  }

  renewSession() {
    const url = environment.apiUrl + environment.endpoints.renew
    this.httpClient.post<HttpResponse<Session>>(url, { token: localStorage.getItem('token') }).subscribe({
      next: (data: HttpResponse<Session>) => {
        if (data.status === 200 || data.status === 202) {
          if (data.body) {
            localStorage.setItem('token', data.body.content.token!) // guardamos el jwt en localstorage
            const { user } = data.body.content
            this._usuario = user
            this.loggedIn = true
          }
        }
        console.log(`This contains body: ${data.body}`);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          console.error('403 status code caught');
        }
      }
    });
  }

  getUserId() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    return helper.decodeToken(token!).id;
  }

  // mail, name, lastname, gender, password, contact
  registerUser(mail: String, nickname: String, name: String, lastname: String, gender: String, contact: Number, birthdate: Date, password: String): any {
    let register = this.httpClient.post(environment.apiUrl + environment.endpoints.register, { mail, nickname, name, lastname, gender, contact, birthdate, password })
    return register;
  }

  rememberPassword(user: User, password: string = null!) {
    if (password == null) {
      localStorage.setItem('password', "")
    } else localStorage.setItem('password', password)
    this._usuario = user;
  }

  get user() {
    return this._usuario;
  }
}
