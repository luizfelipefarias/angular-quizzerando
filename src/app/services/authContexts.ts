import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'https://quizzerando-api.onrender.com'; // URL do backend

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Subjects para armazenar o estado atual do token, role, userId e userInfo
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('auth'));
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  private userIdSubject = new BehaviorSubject<string | null>(localStorage.getItem('user@id'));
  private userInfoSubject = new BehaviorSubject<string | null>(localStorage.getItem('userInfo'));

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Método para fazer login. Envia dados ao backend e, se receber token, salva localmente e atualiza os subjects
  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/auth/login`, data).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('auth', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('user@id', response.id);
          localStorage.setItem('userInfo', JSON.stringify(response.userInfo || {}));

          this.tokenSubject.next(response.token);
          this.roleSubject.next(response.role);
          this.userIdSubject.next(response.id);
          this.userInfoSubject.next(JSON.stringify(response.userInfo || {}));
          
        }
      })
    );
  }

  // Método para registrar usuário (cadastro)
  register(data: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/usuario/register`, data);
  }

  // Logout: limpa localStorage e atualiza estados, depois redireciona para login
  logout(): void {
    localStorage.clear();
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
    this.userIdSubject.next(null);
    this.userInfoSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  // Opcional: getters para observables se quiser acompanhar mudanças
  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  get role$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  get userId$(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  get userInfo$(): Observable<string | null> {
    return this.userInfoSubject.asObservable();
  }

  // Getters para pegar valor atual direto
  get token(): string | null {
    return this.tokenSubject.value;
  }

  get role(): string | null {
    return this.roleSubject.value;
  }

  get userId(): string | null {
    return this.userIdSubject.value;
  }

  get userInfo(): string | null {
    return this.userInfoSubject.value;
  }
}
