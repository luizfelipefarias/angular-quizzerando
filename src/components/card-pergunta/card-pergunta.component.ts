import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-pergunta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-pergunta.component.html',
  styleUrl: './card-pergunta.component.css'
})
export class CardPerguntaComponent {
  @Input() pergunta:any = [];
  @Input() index!: number;
  @Output() event = new EventEmitter<void>();
  
}
