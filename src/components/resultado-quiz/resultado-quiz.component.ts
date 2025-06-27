import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultado-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado-quiz.component.html',
  styleUrl: './resultado-quiz.component.css'
})
export class ResultadoQuizComponent {
  @Input() acertos: number = 0;
  @Input() total: number = 0;

  @Output() tentarNovamenteOut = new EventEmitter<void>();
  @Output() sairResultadoOut = new EventEmitter<void>();

  tentarNovamente() {
    this.tentarNovamenteOut.emit();
  }

  sairResultado() {
    this.sairResultadoOut.emit();
  }
}
