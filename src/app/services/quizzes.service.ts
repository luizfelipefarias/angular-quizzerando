import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  private readonly url = "https://quizzerando-api.onrender.com/quizz"
  private token = localStorage.getItem("auth")

  listaQuizzes: Quiz[] = [];


  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(this.url, {headers: new HttpHeaders(
				{'Authorization': `Bearer ${this.token}`}
    )});
  }


}
