import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule, NgForm } from '@angular/forms';
import CategoriasIcons from '../../../src/assets/categoriasIcons.json'
import { Pergunta, QuizData, QuizzesService } from '../../app/services/quizzes.service';
import { Router } from '@angular/router';
import { CardPerguntaComponent } from '../../components/card-pergunta/card-pergunta.component';


@Component({
  selector: 'app-criar-quiz',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, CardPerguntaComponent],
  templateUrl: './criar-quiz.component.html',
  styleUrl: './criar-quiz.component.css'
})
export class CriarQuizComponent {
  @ViewChild('modalRef') modal!: ModalComponent;
  @ViewChild('formData') formData!:NgForm;
  protected validatedQuestion: boolean = false;
  protected validatedCard: boolean = false;
  protected activateSaveButton: number=0;
  index: number = 0;
  protected altsIncorretas: string[] = [];
  protected perguntas: any = [];
  protected categorias = CategoriasIcons;

  modeloQuiz: any = {
    titulo: '',
    descricao: '',
    categoria: '',
  } 
  modeloPergunta: any = {
    enunciado: '',
    respCorreta: '',
    alternativa1: '',
    alternativa2: '',
    alternativa3: '',
    alternativa4: ''
  };


  constructor(private serviceTitle: Title, private serviceQuiz: QuizzesService, private router: Router) {
    this.serviceTitle.setTitle('Quizzerando - Criar Quiz')
  }
  handleAddIconrretas() {
    this.altsIncorretas.push('')
  }
  
  removeAltIncorreta(index: number) {
    this.altsIncorretas = this.altsIncorretas.filter((_, i) => i !== index)
  }
  //vini alteracoes
  activateSaveButtonIncrement(){
    this.activateSaveButton+=1;
  }
  activateSaveButtonDecrement(){
    this.activateSaveButton-=1;
  }
  clearFormQuestion=()=>{
    this.formData?.resetForm()
    this.validatedQuestion=false;
  }
  handleCadastroPerguntas(formData: NgForm) {
    this.validatedQuestion=true;
    if(formData.invalid){
      return;
    }
    this.perguntas.push(formData.value);
    this.modal.close();
    this.clearFormQuestion()
  }

  handleDelete(index: number) {
    this.perguntas.splice(index, 1);
  }
  
  getCategoriasKeys(): string[] {
    return Object.keys(this.categorias);
  }

  handleSaveQuiz(quizData: QuizData,quizFormData:NgForm) {
  this.validatedCard=true;
  if(quizFormData.invalid){
    return
  }
  this.validatedCard=false
  quizFormData?.resetForm()
  this.formData?.resetForm()
  this.activateSaveButton=0;
  this.serviceQuiz.postQuiz(quizData).subscribe({
    next: (res: any) => {
      const quizzId = res.body?.id || res.id;  
      if (!!quizzId) {  
        

        if (!quizzId) {
          console.error('ID do quiz não retornado pela API');
          return;
        }
        
        // Cadastrando as perguntas
        this.perguntas.forEach((pergunta: any) => {
          const perguntaData = { ...pergunta, quizzId };
          
          this.serviceQuiz.postPerguntas(perguntaData).subscribe({
            next: () => {
              console.log('Pergunta cadastrada com sucesso!');
            },
            error: (err: any) => {
              console.error('Erro ao cadastrar pergunta:', err);
            }
          });
        });

        
        this.router.navigate(['/']);
      } else {
        console.error('Falha ao cadastrar quiz:', res);
      }
    },
    error: (err) => {
      console.error('Erro ao enviar quiz:', err);
    }
  });
}
}
