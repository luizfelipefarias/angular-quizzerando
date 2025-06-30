import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Pergunta, Quiz, QuizzesService } from '../../app/services/quizzes.service';
import CategoriasIcons from '../../../src/assets/categoriasIcons.json'
import { CommonModule, Location } from '@angular/common';
import { PerguntaQuizComponent } from '../../components/pergunta-quiz/pergunta-quiz.component';
import { Router } from '@angular/router';
import { ResultadoQuizComponent } from '../../components/resultado-quiz/resultado-quiz.component';
import { AuthService } from '../../app/services/authContexts';
@Component({
  selector: 'app-quiz-pages',
  standalone: true,
  imports: [CommonModule, PerguntaQuizComponent,ResultadoQuizComponent],
  templateUrl: './quiz-pages.component.html',
  styleUrl: './quiz-pages.component.css'
})
export class QuizPagesComponent {
  protected resultado: { acertos: number; total: number } = { acertos: 0, total: 0 };
  protected userId: string = ''; 
  protected id:string='';
  protected catIcons: { [key: string]: string } = CategoriasIcons;
  protected quizId: string = '';
  protected quiz: Quiz = {
    titulo: '',
    descricao: '',
    categoria: '',
  };
  
  protected quizStatus: string = 'toInit';
  protected perguntas: Pergunta[] = [];

  constructor(private route: ActivatedRoute, private serviceTitle: Title, private quizzesService: QuizzesService, private location: Location,private router: Router,private authService:AuthService ){
    this.serviceTitle.setTitle('Quiz');
    this.authService.userInfo$.subscribe((userinfo)=>{
      this.id=userinfo.id
    })
  }

  ngOnInit(){
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    this.quizId = idFromRoute ?? '';
    this.quizzesService.getQuizById(this.quizId).subscribe((data => {
      this.quiz = data;
   if (this.id) {
    this.userId = this.id;
  }
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
  againInitQuiz(){
     this.quizStatus = 'toInit';
  }

  onFinalizarQuiz(resultado: { acertos: number; total: number }) {
    this.resultado=resultado;
    this.quizStatus = 'finalizado';
    
  }


}
