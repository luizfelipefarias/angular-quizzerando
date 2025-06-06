import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHistoricoComponent } from './card-historico.component';

describe('CardHistoricoComponent', () => {
  let component: CardHistoricoComponent;
  let fixture: ComponentFixture<CardHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHistoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
