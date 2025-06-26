import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../app/services/authContexts';
import { Quiz, QuizzesService } from '../../app/services/quizzes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnInit {

  @Input() quiz: any;
  @Input() categoriaI: string = '';
  token: string|null = '';
  role: string|null = '';

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

  handleDelete() {

  }
}
