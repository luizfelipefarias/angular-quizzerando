import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule } from '@angular/forms';
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
      this.perguntas = data;
      this.perguntas.sort((a: any, b: any) => a.id - b.id)
      console.log(this.perguntas)
    })
  }

  handleAddIconrretas() {
    this.altsIncorretas.push('')
  }

  removeAltIncorreta(index: number) {
    this.altsIncorretas = this.altsIncorretas.filter((_, i) => i !== index)
  }

  handleCadastroPerguntas(formData: any) {
    this.perguntas.push(formData.value);
    this.perguntasToBeAdded.push(formData.value);
    this.modal.close();
  }

  handleDelete(id: number, index: number, p: any){
    this.perguntasToBeDeleted.push(id)
    this.perguntas.splice(index, 1);
    this.perguntasToBeAdded.filter((p: any) => p !== p)
  }

  handleEditQuiz(data: QuizData, id: string | null){
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
