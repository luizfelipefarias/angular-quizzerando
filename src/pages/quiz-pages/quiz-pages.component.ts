import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Pergunta, Quiz, QuizzesService } from '../../app/services/quizzes.service';
import CategoriasIcons from '../../../src/assets/categoriasIcons.json'
import { CommonModule, Location } from '@angular/common';
import { PerguntaQuizComponent } from '../../components/pergunta-quiz/pergunta-quiz.component';

@Component({
  selector: 'app-quiz-pages',
  standalone: true,
  imports: [CommonModule, PerguntaQuizComponent],
  templateUrl: './quiz-pages.component.html',
  styleUrl: './quiz-pages.component.css'
})
export class QuizPagesComponent {
  protected catIcons: { [key: string]: string } = CategoriasIcons;
  private quizId: string | null = '';
  protected quiz: Quiz = {
    titulo: '',
    descricao: '',
    categoria: '',
    perguntas: []
  };
  protected quizStatus: string = 'toInit';
  protected perguntas: Pergunta[] = [];

  constructor(private route: ActivatedRoute, private serviceTitle: Title, private quizzesService: QuizzesService, private location: Location) {
    this.serviceTitle.setTitle('Quiz');
  }

  ngOnInit(){
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.quizzesService.getQuizById(this.quizId).subscribe((data => {
      this.quiz = data;
    }));
  }

  handleInitQuiz(){
    this.quizzesService.getPerguntasByQuizId(this.quizId).subscribe((data => {
      this.perguntas = data;
    }));

    this.quizStatus = 'onGoing';
  }

  handleExit(){
    this.location.back();
  }



}
