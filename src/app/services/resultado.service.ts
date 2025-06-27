import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '../app.routes';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  url: string = API_URL+'/resultado';
  token: string | null = localStorage.getItem('auth');

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  postResultado(resultado: { pontuacao: number; quizzId: string; userId: string; acertos: number; erros: number }): Observable<any> {
    return this.http.post(`${this.url}/cad`, resultado, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    });
  }
  
}
