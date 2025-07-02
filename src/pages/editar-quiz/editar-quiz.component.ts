import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule,NgForm } from '@angular/forms';
import { Pergunta, Quiz, QuizData, QuizzesService } from '../../app/services/quizzes.service';
import CategoriasIcons from '../../../src/assets/categoriasIcons.json'
import { CardPerguntaComponent } from '../../components/card-pergunta/card-pergunta.component';

@Component({
  selector: 'app-editar-quiz',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, CardPerguntaComponent],
  templateUrl: './editar-quiz.component.html',
  styleUrl: './editar-quiz.component.css'
})
export class EditarQuizComponent {
  @ViewChild('modalRef') modal!: ModalComponent;
  @ViewChild('formData') formData!:NgForm;
  protected validatedQuestion: boolean = false;
  protected validatedCard: boolean = false;
  protected activateSaveButton: number=0;
  protected quizId!: string | null;
  protected quiz: Quiz = {
    titulo: '',
    descricao: '',
    categoria: '',
  } ;
  protected perguntas: any = [];
  protected perguntasToBeDeleted: number[] = [];
  protected perguntasToBeAdded: any = [];


  protected validated: boolean = false;
  protected altsIncorretas: string[] = [];
  protected categorias = CategoriasIcons;

  modeloQuiz: any = {
    titulo: '',
    descricao: '',
    categoria: '',
  } 
  modelo: any = {
    enunciado: '',
    respCorreta: '',
    alternativa1: '',
    alternativa2: '',
    alternativa3: '',
    alternativa4: ''
  };


  constructor(private route: ActivatedRoute, private serviceTitle: Title, private serviceQuiz: QuizzesService, private router: Router){
    this.serviceTitle.setTitle('Editando - ');
  }

  ngOnInit(){
    this.quizId = this.route.snapshot.paramMap.get('id');
    
    this.serviceQuiz.getQuizById(this.quizId).subscribe((data) =>{
      this.quiz = data;
      this.modeloQuiz = data;
      this.serviceTitle.setTitle('Editando - ' + this.quiz.titulo);
    })

    this.serviceQuiz.getPerguntasByQuizId(this.quizId).subscribe((data) =>{
      if(data){
        this.activateSaveButton=data.length;
      }
      console.log(this.activateSaveButton)
      this.perguntas = data;
      this.perguntas.sort((a: any, b: any) => a.id - b.id)
      
    })
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
    this.perguntasToBeAdded.push(formData.value);
    this.modal.close();
    this.clearFormQuestion()
  }

  handleDelete(id: number, index: number, p: any){
    this.perguntasToBeDeleted.push(id)
    this.perguntas.splice(index, 1);
    this.perguntasToBeAdded.filter((p: any) => p !== p)
  }

  handleEditQuiz(data: QuizData, id: string | null, quizFormData:NgForm){
  this.validatedCard=true;
  if(quizFormData.invalid){
    return
  }
  this.validatedCard=false;
  quizFormData?.resetForm();
  this.formData?.resetForm();
  this.activateSaveButton=0;
    this.serviceQuiz.updateQuiz({data, id}).subscribe(
      {next: (res: any) => {
        const quizzId = res.body?.id || res.id;  
        if (!!quizzId) {  


          if (!quizzId) {
            console.error('ID do quiz não retornado pela API');
            return;
          }

          // Deletando as perguntas
          this.perguntasToBeDeleted.forEach((index: any) => {
            this.serviceQuiz.deletePergunta(index).subscribe({
              next: () => {
                console.log('Pergunta deletada com sucesso!');
              },
              error: (err: any) => {
                console.error('Erro ao deletar pergunta:', err);
              }
            });
          });

          this.perguntasToBeAdded.forEach((pergunta: any) => {
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

        }
        this.router.navigate(['/'])
      }
    })
  }

  getCategoriasKeys(): string[] {
  return Object.keys(this.categorias);
  }
}
