import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Pergunta } from '../../app/services/quizzes.service';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoService } from '../../app/services/resultado.service';

@Component({
  selector: 'app-pergunta-quiz',
  standalone: true,
  imports: [CommonModule, NgbProgressbarModule,],
  templateUrl: './pergunta-quiz.component.html',
  styleUrl: './pergunta-quiz.component.css'
})
export class PerguntaQuizComponent {
  @Input() perguntas: Pergunta[] = [];
  @Input() quizzId!: string; 
  @Input() userId!: string; 
  protected perguntasLength: number = this.perguntas.length;
  protected pergunta: Pergunta = {
    enunciado: '',
    respCorreta: '',
    alternativa1: '',
    alternativa2: '',
    alternativa3: '',
    alternativa4: ''
  };
  @Output() finalizarQuiz = new EventEmitter<{ acertos: number, total: number }>();

  protected indexPergunta: number = 0;
  protected alternativasEmbaralhadas: { valor: string, texto: string }[][] = [];
  protected selecionadas: string[] = [];
  protected corretas: number = 0;
  
   constructor(private resultadoService: ResultadoService) {}
  ngOnChanges(changes: SimpleChanges): void {
  if (changes['perguntas'] && this.perguntas.length > 0) {
    this.indexPergunta = 0;
    this.perguntasLength = this.perguntas.length;
    this.pergunta = this.perguntas[this.indexPergunta];
    
    this.alternativasEmbaralhadas = this.perguntas.map(pergunta => {
        return this.embaralharAlternativas(pergunta)
      })

    
  }
}
  
  embaralharAlternativas(pergunta: Pergunta): { valor: string, texto: string }[] {
  const alternativas = [
    { valor: 'alternativa1', texto: pergunta.alternativa1 },
    { valor: 'alternativa2', texto: pergunta.alternativa2 },
    { valor: 'alternativa3', texto: pergunta.alternativa3 },
    { valor: 'alternativa4', texto: pergunta.alternativa4 },
    { valor: 'respCorreta', texto: pergunta.respCorreta }
  ].filter(alt => alt.texto); 

  for (let i = alternativas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]];
  }

  return alternativas;
}
  onSelecionarAlternativa(valor: string) {
  this.selecionadas[this.indexPergunta] = valor;
  this.atualizarCorretas();
}

  atualizarCorretas() {
  this.corretas = this.selecionadas.filter((alt, i) => {
    return alt === 'respCorreta';
  }).length;
}

  handleNext(){
    this.indexPergunta++;
    this.pergunta = this.perguntas[this.indexPergunta];
    
  }

  handleGoBack(){
    this.indexPergunta--;
    this.pergunta = this.perguntas[this.indexPergunta];
  }

  handleFinish(){
    this.atualizarCorretas();

    const erros = this.perguntasLength - this.corretas;

    
    const resultado = {
      pontuacao: (this.corretas / this.perguntasLength) * 100,
      quizzId: this.quizzId,
      userId: this.userId,
      acertos: this.corretas,
      erros: erros
    };

    
    this.resultadoService.postResultado(resultado).subscribe({
      next: (res:any) => {
        console.log('Resultado salvo com sucesso', res);
       
        this.finalizarQuiz.emit({ acertos: this.corretas, total: this.perguntasLength });
      },
      error: (err) => {
        console.error('Erro ao salvar resultado', err);
        
        this.finalizarQuiz.emit({ acertos: this.corretas, total: this.perguntasLength });
      }
    });
  }
  

}
