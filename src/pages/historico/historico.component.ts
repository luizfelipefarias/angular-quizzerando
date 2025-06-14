import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {

  constructor(private serviceTitle: Title){
    this.serviceTitle.setTitle('Meu Histórico')
  }

}
