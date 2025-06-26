import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Quiz, QuizzesService } from '../../app/services/quizzes.service';
import categoriasIcons from '../../assets/categoriasIcons.json'

interface ResultadoQuiz{
    quizzId: string,
    erros: number,
    acertos: number,
    pontuacao: number
}

@Component({
  selector: 'app-card-historico',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './card-historico.component.html',
  styleUrl: './card-historico.component.css'
})
export class CardHistoricoComponent {
  @Input() historicoQuiz!: ResultadoQuiz;

  @Input() categoria: any = categoriasIcons;

  protected quiz!: Quiz;

  constructor(private serviceQuizzes: QuizzesService){

  }

  ngOnInit(){
    this.serviceQuizzes.getQuizById(this.historicoQuiz.quizzId).subscribe((data) => {
      this.quiz = data;
    })
  }
}
