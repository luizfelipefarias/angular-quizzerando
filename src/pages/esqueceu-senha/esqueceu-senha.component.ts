import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-esqueceu-senha',
  standalone: true,
  imports: [],
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.css'
})
export class EsqueceuSenhaComponent {

  constructor(private serviceTitle: Title){
    this.serviceTitle.setTitle('Recuperar senha')
  }
  
}
