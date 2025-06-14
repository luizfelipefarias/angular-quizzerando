import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-quiz',
  standalone: true,
  imports: [],
  templateUrl: './editar-quiz.component.html',
  styleUrl: './editar-quiz.component.css'
})
export class EditarQuizComponent {
  public quizId : string | null = '';
  public nomeQuiz : string = '';

  constructor(private route: ActivatedRoute, private serviceTitle: Title){
    this.serviceTitle.setTitle('Editando - ');
  }

  ngOnInit(){
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.serviceTitle.setTitle('Editando - ' + this.nomeQuiz);
  }


}
