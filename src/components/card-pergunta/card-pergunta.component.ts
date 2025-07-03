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

  @Input() modelo: any = {
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
  }

  handleEditPergunta(id: number, formDataPergunta: NgForm) {
    this.perguntasToBeEdited.push({ id: id, formData: formDataPergunta.value });
    this.modal.close()
  }

  handleAddIconrretas() {
    this.altsIncorretas.push('')
  }

  removeAltIncorreta(index: number) {
    this.altsIncorretas = this.altsIncorretas.filter((_, i) => i !== index)
  }

  createRange(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
