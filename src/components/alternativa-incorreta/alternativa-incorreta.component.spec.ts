import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativaIncorretaComponent } from './alternativa-incorreta.component';

describe('AlternativaIncorretaComponent', () => {
  let component: AlternativaIncorretaComponent;
  let fixture: ComponentFixture<AlternativaIncorretaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternativaIncorretaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternativaIncorretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
