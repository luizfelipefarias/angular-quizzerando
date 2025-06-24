import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-criar-quiz',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './criar-quiz.component.html',
  styleUrl: './criar-quiz.component.css'
})
export class CriarQuizComponent {

  constructor(private serviceTitle: Title){
    this.serviceTitle.setTitle('Quizzerando - Criar Quiz')
  }
  
}
