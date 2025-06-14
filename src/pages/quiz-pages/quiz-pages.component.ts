import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-pages',
  standalone: true,
  imports: [],
  templateUrl: './quiz-pages.component.html',
  styleUrl: './quiz-pages.component.css'
})
export class QuizPagesComponent {
  public quizId : string | null = '';

  constructor(private route: ActivatedRoute, private serviceTitle: Title) {
    this.serviceTitle.setTitle('Quiz');
  }

  ngOnInit(){
    this.quizId = this.route.snapshot.paramMap.get('id')
  }

}
