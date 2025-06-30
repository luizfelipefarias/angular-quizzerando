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
export class QuizCardComponent {
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
    this.authService.token$.subscribe((token)=>{
     this.token =token
    });
  this.authService.userInfo$.subscribe((userinfo)=>{
   this.role=userinfo.role;
  });

  
  }

  openDeleteModal() {

  }

  handleDelete(quizId: number, index: number) {
    
    this.quizService.deleteQuizById(quizId).subscribe((data) => {
      this.listaQuizzes.splice(index, 1)
      this.modal.close()
    })

  }
}
