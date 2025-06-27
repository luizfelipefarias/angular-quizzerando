import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Quiz, QuizzesService } from '../../app/services/quizzes.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/services/authContexts';
import { QuizCardComponent } from '../../components/quiz-card/quiz-card.component';
import CategoriasIcons from '../../../src/assets/categoriasIcons.json'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, QuizCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected listaQuizzes: Quiz[] = [];
  protected catIcons: { [key: string]: string } = CategoriasIcons;
  protected role!: string | null;

  constructor( private titleService: Title, private quizzesService: QuizzesService, private auth: AuthService) {
    this.titleService.setTitle('Quizzerando - Home');
  }

  ngOnInit(): void{
    this.role = this.auth.role;

    this.quizzesService.getQuizzes().subscribe((data) => {
      this.listaQuizzes = data;
    })
  }

  getIcon(categoria: string): string {
  return this.catIcons[categoria] ?? 'icon-default';
}
}
