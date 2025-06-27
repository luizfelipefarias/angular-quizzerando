import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import CategoriasIcons from '../../../src/assets/categoriasIcons.json'


@Component({
  selector: 'app-criar-quiz',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './criar-quiz.component.html',
  styleUrl: './criar-quiz.component.css'
})
export class CriarQuizComponent {
  protected validated: boolean = false;
  index: number = 0;
  protected altsIncorretas: string[] = [];
  protected perguntas: any = [];
  protected categorias = CategoriasIcons;

  modelo: any = {
    enunciado: '',
    respCorreta: '',
    alternativa1: '',
    alternativa2: '',
    alternativa3: '',
    alternativa4: ''
  };


  constructor(private serviceTitle: Title) {
    this.serviceTitle.setTitle('Quizzerando - Criar Quiz')
  }

  handleAddIconrretas() {
    this.altsIncorretas.push('')
  }

  removeAltIncorreta(index: number) {
    this.altsIncorretas = this.altsIncorretas.filter((_, i) => i !== index)
  }

  handleCadastroPerguntas(formData: any) {
    console.log("2", formData.value)
    this.perguntas.push(formData.value)
    console.log(this.perguntas)
    return false;
  }

  handleDelete(index: number) {
    this.perguntas.splice(index, 1);
  }

  getCategoriasKeys(): string[] {
    return Object.keys(this.categorias);
  }
}
