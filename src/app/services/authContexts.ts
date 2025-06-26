import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'https://quizzerando-api.onrender.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('auth'));
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  private userIdSubject = new BehaviorSubject<string | null>(localStorage.getItem('user@id'));
  private userInfoSubject = new BehaviorSubject<any>(this.parseUserInfo());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

 
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
          this.userInfoSubject.next(response.userInfo || {});
        }
      })
    );
  }


  register(data: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/usuario/register`, data);
  }

  logout(): void {
    localStorage.clear();
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
    this.userIdSubject.next(null);
    this.userInfoSubject.next(null);
    this.router.navigate(['/login']);
  }


  isAuthenticated(): boolean {
    return !!this.token && this.hasValidToken();
  }


  hasValidToken(): boolean {
    const token = this.token;
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  }


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


  fetchUserInfo(): Observable<any> {
    return this.http.get<any>(`${API_URL}/usuario/${this.userId}`).pipe(
      tap(userInfo => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.userInfoSubject.next(userInfo);
      })
    );
  }

  updateUser(data: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/usuario/${this.userId}`, data).pipe(
      tap(updatedInfo => {
        localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
        this.userInfoSubject.next(updatedInfo);
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${API_URL}/usuario/change-password`, {
      id: this.userId,
      currentPassword,
      newPassword
    });
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${API_URL}/usuario/${this.userId}`).pipe(
      tap(() => this.logout())
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/admin/usuarios`);
  }

  setRole(userId: string, role: string): Observable<any> {
    return this.http.patch(`${API_URL}/admin/usuario/${userId}/role`, { role });
  }


  banUser(userId: string): Observable<any> {
    return this.http.patch(`${API_URL}/admin/usuario/${userId}/ban`, {});
  }

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  get role$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  get userId$(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  get userInfo$(): Observable<any> {
    return this.userInfoSubject.asObservable();
  }


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


  private parseUserInfo(): any {
    const raw = localStorage.getItem('userInfo');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
