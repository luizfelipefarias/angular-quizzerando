import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-card-pergunta',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './card-pergunta.component.html',
  styleUrl: './card-pergunta.component.css'
})
export class CardPerguntaComponent {
  @Input() pergunta: any = [];
  @Input() index!: number;
  @Input() perguntasToBeEdited: any = [];
  @ViewChild('modalRef') modal!: ModalComponent;
  @ViewChild('formDataPergunta') formDataPergunta!: NgForm;

  @Output() event = new EventEmitter<void>();

  protected validatedQuestion: boolean = false;
  protected validatedCard: boolean = false;
  protected validated: boolean = false;
  protected altsIncorretas: string[] = [];

  modelo: any = {
    enunciado: '',
    respCorreta: '',
    alternativa1: '',
    alternativa2: '',
    alternativa3: '',
    alternativa4: ''
  };

  ngOnInit() {
    const alternativasIncorretas = Object.keys(this.pergunta)
      .filter(key =>
        key.startsWith('alternativa') &&
        this.pergunta[key] && this.pergunta[key] !== ''
      );

    for (let index = 0; index < alternativasIncorretas.length - 1; index++) {
      this.altsIncorretas.push('')
    }
    this.modelo = this.pergunta
  }

  handleEditPergunta(id: number, formDataPergunta: NgForm) {
    this.perguntasToBeEdited.push({ id: id, formData: this.modelo });
    this.modal.close()
  }

  handleAddIconrretas() {
    this.altsIncorretas.push('')
  }

  removeAltIncorreta(index: number) {

  const chave = 'alternativa' + (index + 2);
  
  this.modelo[chave] = null; 
  this.altsIncorretas = this.altsIncorretas.filter((_, i) => i !== index);

  // Reorganiza as chaves seguintes para evitar buracos
  for (let i = index; i < this.altsIncorretas.length; i++) {
    const antigaChave = 'alternativa' + (i + 3);
    const novaChave = 'alternativa' + (i + 2);
    this.modelo[novaChave] = this.modelo[antigaChave];
    this.modelo[antigaChave] = null;
  }

  }

}
