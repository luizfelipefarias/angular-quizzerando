import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

const API_URL = 'https://quizzerando-api.onrender.com';



@Injectable({
  providedIn: 'root'
})

// AuthService é responsável por gerenciar a autenticação do usuário
// alteração de senha, exclusão de conta, gerenciamento de usuários e verificação de autenticação
//presente no armazenamento local do navegador.
// Ele usa o HttpClient para fazer requisições HTTP para a API e o Router para navegar entre rotas.

export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('auth'));
  private userInfoSubject = new BehaviorSubject<any>(this.parseUserInfo() || { role: 'usuario', id: null });


  //Construtor do serviço do AuthService

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

// Método para fazer login do usuário


  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/auth/login`, data).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('auth', response.token);
          this.tokenSubject.next(response.token);

          
          this.fetchUserInfo().subscribe({
            next: () => {
              console.log("Dados do usuário carregado");
             
            },
            error: (err) => {
              console.error('Erro ao buscar informações do usuário:', err);
              this.logout(); 
            }
          });
        }
      })
    );
}

// Método para registrar um novo usuário
// Ele envia os dados de nome, email e senha para a API e retorna a resposta

  register(data: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/usuario/register`, data);
  }
// Método para fazer logout do usuário
// Ele limpa o armazenamento local, atualiza os BehaviorSubjects e redireciona o usuário

  logout(): void {
    localStorage.clear();
    this.tokenSubject.next(null);
    this.userInfoSubject.next({role:'usuario',id:null});
    this.router.navigate(['/login']);
  }

// Método para verificar se o usuário está autenticado

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value && this.hasValidToken();
  }

// Método para verificar se o token é válido

  hasValidToken(): boolean {
    const token = this.tokenSubject.value;
    if (!token) return false;

// Verifica se o token está presente
// e se ele é um JWT válido, verificando a data de expiração

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  }

// Método para verificar se o usuário é um administrador

  isAdmin(): boolean {
    return this.userInfoSubject.value.role === 'admin';
  }

  //Atualiza o token de autenticação
  // Ele envia uma solicitação para a API para obter um novo token

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${API_URL}/auth/refresh`, {}).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('auth', response.token);
          this.tokenSubject.next(response.token);
        }
      })
    );
  }

// Método para buscar informações do usuário
// Ele envia uma solicitação GET para a API com o token de autenticação

 fetchUserInfo(): Observable<any> {
    const token = this.tokenSubject.value;
    if (!token) {
      return throwError(() => new Error('Token não encontrado'));
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this.http.get<any>(`${API_URL}/usuario/${userId}`, { headers }).pipe(
        map(userInfo => ({
          nome: userInfo.nome,
          email: userInfo.email,
          role: userInfo.role,
          id: userInfo.id
        })),
        tap(userInfoFormatado => {
          localStorage.setItem('userInfo', JSON.stringify(userInfoFormatado));
          this.userInfoSubject.next(userInfoFormatado);
        })
      );
    } catch (error) {
      return throwError(() => new Error('Token inválido'));
    }
}

  // Método para atualizar as informações do usuário
  // Ele envia uma solicitação PUT para a API com os dados atualizados

  updateUser(data: any): Observable<any> {
    const token = localStorage.getItem('auth');
     

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
   
  });
  

    return this.http.put<any>(`${API_URL}/usuario/edit/${this.userInfoSubject.value.id}`, data, {headers})
  }

  // Método para alterar a senha do usuário
  // Ele envia uma solicitação POST para a API com a senha atual e a nova senha

  //Recuperacao de senha
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${API_URL}/usuario/change-password`, {
      id: this.userInfoSubject.value.id,
      currentPassword,
      newPassword
    });
  }

  //Remoção da conta
  deleteAccount(): Observable<any> {
    return this.http.delete(`${API_URL}/usuario/${this.userInfoSubject.value.id}`).pipe(
      tap(() => this.logout())
    );
  }

  //Obter o token e userInfo em outros arquivos
  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  get userInfo$():Observable<any>{
    return this.userInfoSubject.asObservable()
  }

 
  //
  private parseUserInfo(): any {
    const raw = localStorage.getItem('userInfo');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
       console.warn('Erro ao parsear userInfo:', raw);
      return null;
    }
  }

  
  
}
