import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  
  constructor(private serviceTitle: Title){
    this.serviceTitle.setTitle('Cadastre-se')
  }

}
