import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CardHistoricoComponent } from '../../components/card-historico/card-historico.component';
import { NgbProgressbar, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../app/services/user.service';
import { AuthService } from '../../app/services/authContexts';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, CardHistoricoComponent, NgbProgressbarModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {
  historico: any = []
  userId: string | null = '';
  questoesErradas = 0
  questoesRespondidas = 0
  questoesCertas = 0
  quizzesRespondidos = 0
  mediaAcertos = 0
  
  
  
  constructor(private serviceTitle: Title, private serviceUser: UserService, private serviceAuth: AuthService) {
    this.serviceAuth.userInfo$.subscribe((userinfo)=>{
      this.userId=JSON.stringify(userinfo.id)
    })
    this.serviceTitle.setTitle('Meu Histórico')
  }
  
  ngOnInit(){
    this.serviceUser.getResultadosByUserId(this.userId).subscribe((data) => {
      this.historico = data;
      this.abs();
    })
    
  }
  
  abs(){
    if (Array.isArray(this.historico)){
      this.quizzesRespondidos = this.historico.length;
      this.questoesRespondidas = this.historico.reduce((total, quiz) =>
        total + quiz.acertos + quiz.erros, 0);
      this.questoesCertas = this.historico.reduce((total, quiz) =>
        total + quiz.acertos, 0);
      this.questoesErradas = this.historico.reduce((total, quiz) =>
        total + quiz.erros, 0);
      this.mediaAcertos = this.questoesRespondidas > 0
      ? ((this.questoesCertas / this.questoesRespondidas) * 100)
      : 0;
    }
    
    
  }
}
