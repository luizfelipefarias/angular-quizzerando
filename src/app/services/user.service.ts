import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../app.routes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = API_URL+'/usuario';
  token: string | null = localStorage.getItem('auth');

  constructor(
      private http: HttpClient,
      private router: Router
    ) {}


    getResultadosByUserId(userId: string | null): Observable<any>{
    return this.http.get<any>(`${this.url}/${userId}/resultados`, {headers: new HttpHeaders(
				{'Authorization': `Bearer ${this.token}`}
    )});
  }
}
