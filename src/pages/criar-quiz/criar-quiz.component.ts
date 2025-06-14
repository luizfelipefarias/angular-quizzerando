import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-criar-quiz',
  standalone: true,
  imports: [],
  templateUrl: './criar-quiz.component.html',
  styleUrl: './criar-quiz.component.css'
})
export class CriarQuizComponent {

  constructor(private serviceTitle: Title){
    this.serviceTitle.setTitle('Quizzerando - Criar Quiz')
  }
  
}
