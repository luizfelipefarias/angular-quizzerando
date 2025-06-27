import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../app/services/authContexts';
import { Quiz, QuizzesService } from '../../app/services/quizzes.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnInit {
  @ViewChild('modalRef') modal!: ModalComponent;
  @Input() quiz: any;
  @Input() categoriaI: string = '';
  token: string | null = '';
  role: string | null = '';
  @Input() listaQuizzes!: Quiz[];
  @Input() index!: number;

  constructor(
    private quizService: QuizzesService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.token = this.authService.token;
    this.role = this.authService.role
  }

  openDeleteModal() {

  }

  handleDelete(quizId: number, index: number) {
    console.log(quizId)
    this.quizService.deleteQuizById(quizId).subscribe((data) => {
      this.listaQuizzes.splice(index, 1)
      this.modal.close()
    })

  }
}
