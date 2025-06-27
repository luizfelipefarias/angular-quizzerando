import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { Pergunta, Quiz, QuizzesService } from '../../app/services/quizzes.service';
import CategoriasIcons from '../../../src/assets/categoriasIcons.json'

@Component({
  selector: 'app-editar-quiz',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './editar-quiz.component.html',
  styleUrl: './editar-quiz.component.css'
})
export class EditarQuizComponent {
  @ViewChild('modalRef') modal!: ModalComponent;
  protected quizId : string | null = '';
  protected quiz!: Quiz;
  protected perguntas: any = [];

  protected validated: boolean = false;
  protected altsIncorretas: string[] = [];
  protected categorias = CategoriasIcons;

  modelo: any = {
    enunciado: '',
    respCorreta: '',
    alternativa1: '',
    alternativa2: '',
    alternativa3: '',
    alternativa4: ''
  };


  constructor(private route: ActivatedRoute, private serviceTitle: Title, private serviceQuiz: QuizzesService){
    this.serviceTitle.setTitle('Editando - ');
  }

  ngOnInit(){
    this.quizId = this.route.snapshot.paramMap.get('id');
    
    this.serviceQuiz.getQuizById(this.quizId).subscribe((data) =>{
      this.quiz = data;
      this.serviceTitle.setTitle('Editando - ' + this.quiz.titulo);
    })

    this.serviceQuiz.getPerguntasByQuizId(this.quizId).subscribe((data) =>{
      this.perguntas = data;
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
    this.modal.close();
  }

  handleDelete(index: number){
    this.perguntas.splice(index, 1);
  }

  getCategoriasKeys(): string[] {
  return Object.keys(this.categorias);
  }
}
