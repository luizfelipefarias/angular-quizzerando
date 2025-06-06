import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPagesComponent } from './quiz-pages.component';

describe('QuizPagesComponent', () => {
  let component: QuizPagesComponent;
  let fixture: ComponentFixture<QuizPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
