import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'https://quizzerando-api.onrender.com';

// Faz com que o serviço seja injetável em qualquer parte da aplicação
// e esteja disponível em todo o aplicativo Angular ou seja,define globalmente.

@Injectable({
  providedIn: 'root'
})

// AuthService é responsável por gerenciar a autenticação do usuário
// alteração de senha, exclusão de conta, gerenciamento de usuários e verificação de autenticação
//presente no armazenamento local do navegador.
// Ele usa o HttpClient para fazer requisições HTTP para a API e o Router para navegar entre rotas.

export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('auth'));
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  private userIdSubject = new BehaviorSubject<string | null>(localStorage.getItem('user@id'));
  private userInfoSubject = new BehaviorSubject<any>(this.parseUserInfo());

  //Construtor do serviço do AuthService

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

// Método para fazer login do usuário
 // Ele envia os dados de email e senha para a API e, se o login for bem-sucedido,
 // armazena o token, a função do usuário e o ID do usuário no armazenamento local

  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/auth/login`, data).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('auth', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('user@id', response.id);

// Atualiza os BehaviorSubjects com os novos valores
          // Isso permite que outros componentes que estão observando esses subjects

          this.tokenSubject.next(response.token);
          this.roleSubject.next(response.role);
          this.userIdSubject.next(response.id);
          this.fetchUserInfo().subscribe({
            next: userInfo => {
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              this.userInfoSubject.next(userInfo);
            },
            error: err => {
              console.error('Erro ao buscar userInfo após login:', err);
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
    this.roleSubject.next(null);
    this.userIdSubject.next(null);
    this.userInfoSubject.next(null);
    this.router.navigate(['/login']);
  }

// Método para verificar se o usuário está autenticado

  isAuthenticated(): boolean {
    return !!this.token && this.hasValidToken();
  }

// Método para verificar se o token é válido

  hasValidToken(): boolean {
    const token = this.token;
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
    return this.role === 'admin';
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })
    return this.http.get<any>(`${API_URL}/usuario/${this.userId}`,{headers}).pipe(
      tap(userInfo => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.userInfoSubject.next(userInfo);
      })
    );
  }

  // Método para atualizar as informações do usuário
  // Ele envia uma solicitação PUT para a API com os dados atualizados

  updateUser(data: any): Observable<any> {
    const token = localStorage.getItem('auth');
    console.log(token) // ou sessionStorage

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
   
  });
  

    return this.http.put<any>(`${API_URL}/usuario/edit/${this.userId}`, data, {headers}).pipe(
      tap(updatedInfo => {
        localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
        this.userInfoSubject.next(updatedInfo);
      })
    );
  }

  // Método para alterar a senha do usuário
  // Ele envia uma solicitação POST para a API com a senha atual e a nova senha

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${API_URL}/usuario/change-password`, {
      id: this.userId,
      currentPassword,
      newPassword
    });
  }

// Método para excluir a conta do usuário
// Ele envia uma solicitação DELETE para a API com o ID do usuário

  deleteAccount(): Observable<any> {
    return this.http.delete(`${API_URL}/usuario/${this.userId}`).pipe(
      tap(() => this.logout())
    );
  }

// Método para buscar todos os usuários
// Ele envia uma solicitação GET para a API e retorna a lista de usuários

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/admin/usuarios`);
  }
// Método para buscar um usuário específico pelo ID
// Ele envia uma solicitação GET para a API com o ID do usuário

  setRole(userId: string, role: string): Observable<any> {
    return this.http.patch(`${API_URL}/admin/usuario/${userId}/role`, { role });
  }

// Método para banir um usuário
// Ele envia uma solicitação PATCH para a API com o ID do usuário


  banUser(userId: string): Observable<any> {
    return this.http.patch(`${API_URL}/admin/usuario/${userId}/ban`, {});
  }
// Método para desbanir um usuário
// Ele envia uma solicitação PATCH para a API com o ID do usuário

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
// Método para obter o papel do usuário
// Ele retorna um Observable que emite o papel do usuário

  get role$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

// Método para obter o ID do usuário
// Ele retorna um Observable que emite o ID do usuário

  get userId$(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

// Método para obter as informações do usuário
// Ele retorna um Observable que emite as informações do usuário

  get userInfo$(): Observable<any> {
    return this.userInfoSubject.asObservable();
  }

// Getters para acessar os valores atuais dos BehaviorSubjects
  get token(): string | null {
    return this.tokenSubject.value;
  }
  get role(): string | null {
    return this.roleSubject.value;
  }
  get userId(): string | null {
    return this.userIdSubject.value;
  }
  get userInfo(): any {
    return this.userInfoSubject.value;
  }

// Método privado para analisar as informações do usuário armazenadas no localStorage
  
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
