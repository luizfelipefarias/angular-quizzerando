import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaQuizComponent } from './pergunta-quiz.component';

describe('PerguntaQuizComponent', () => {
  let component: PerguntaQuizComponent;
  let fixture: ComponentFixture<PerguntaQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerguntaQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerguntaQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
