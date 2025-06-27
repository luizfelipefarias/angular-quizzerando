import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.routes';

export interface Pergunta{
  enunciado: string,
  respCorreta: string,
  alternativa1: string,
  alternativa2: string,
  alternativa3: string,
  alternativa4: string,
}
export interface Quiz{
  titulo: string,
  descricao: string,
  categoria: string,
  perguntas: Pergunta[],
}

export interface QuizData{
  titulo: string,
  descricao: string,
  categoria: string,
}

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  private readonly url = API_URL + "/quizz"
  private token = localStorage.getItem("auth")

  listaQuizzes: Quiz[] = [];


  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(this.url, {headers: new HttpHeaders(
				{'Authorization': `Bearer ${this.token}`}
    )});
  }

  getQuizById(quizId: string | null): Observable<Quiz>{
    return this.http.get<Quiz>(`${this.url}/${quizId}`, {headers: new HttpHeaders(
				{'Authorization': `Bearer ${this.token}`}
    )});
  }

  getPerguntasByQuizId(quizId: string | null){
    return this.http.get<Pergunta[]>(`${this.url}/${quizId}/perguntas`, {headers: new HttpHeaders(
				{'Authorization': `Bearer ${this.token}`}
    )});
  }

  postQuiz(quiz: QuizData): Observable<any> {
      return this.http.post(`${this.url}/cad`, quiz, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        })
      });
    }

  postPerguntas(data: {pergunta: Pergunta, quizId: number}): Observable<any> {
      return this.http.post(`${API_URL}/pergunta/cad`, data, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        })
      });
    }

  deleteQuizById(quizId: number | null): Observable<Quiz>{
    return this.http.delete<Quiz>(`${this.url}/del/${quizId}`, {headers: new HttpHeaders(
				{'Authorization': `Bearer ${this.token}`}
    )});
  }

}
